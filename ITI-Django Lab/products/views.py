from django.shortcuts import render, get_object_or_404, redirect
from django.urls import reverse
from django.contrib import messages
from .models import Product
from .forms import ProductForm


def product_list(request):
    q = request.GET.get("q", "").strip()
    category_id = request.GET.get("category")
    products = Product.objects.all()
    if q:
        products = products.filter(name__icontains=q) | products.filter(
            code__icontains=q
        )
    if category_id:
        products = products.filter(category_id=category_id)
    return render(request, "products/list.html", {"products": products, "q": q})


def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, "products/detail.html", {"product": product})


def product_create(request):
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save()
            messages.success(request, "Product created successfully.")
            return redirect("products:detail", pk=product.pk)
    else:
        form = ProductForm()
    return render(request, "products/form.html", {"form": form, "mode": "Create"})


def product_edit(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            messages.success(request, "Product updated successfully.")
            return redirect("products:detail", pk=product.pk)
    else:
        form = ProductForm(instance=product)
    return render(request, "products/form.html", {"form": form, "mode": "Edit"})


def product_delete(request, pk):
    product = get_object_or_404(Product, pk=pk)
    if request.method == "POST":
        product.delete()
        messages.success(request, "Product deleted.")
        return redirect("products:list")
    return render(request, "products/confirm_delete.html", {"product": product})
