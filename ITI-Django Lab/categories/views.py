from django.urls import reverse_lazy
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView,
)
from django.contrib.auth.mixins import LoginRequiredMixin
from .models import Category
from .forms import CategoryForm


class CategoryListView(ListView):
    model = Category
    template_name = "categories/list.html"
    context_object_name = "categories"


class CategoryDetailView(DetailView):
    model = Category
    template_name = "categories/detail.html"
    context_object_name = "category"


class CategoryCreateView(LoginRequiredMixin, CreateView):
    model = Category
    form_class = CategoryForm
    template_name = "categories/form.html"
    success_url = reverse_lazy("categories:list")


class CategoryUpdateView(LoginRequiredMixin, UpdateView):
    model = Category
    form_class = CategoryForm
    template_name = "categories/form.html"
    success_url = reverse_lazy("categories:list")


class CategoryDeleteView(LoginRequiredMixin, DeleteView):
    model = Category
    template_name = "categories/confirm_delete.html"
    success_url = reverse_lazy("categories:list")
