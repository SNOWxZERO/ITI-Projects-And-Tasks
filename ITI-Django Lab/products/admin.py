from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("name", "code", "price", "instock_items", "created_at")
    search_fields = ("name", "code", "description", "price")
    list_filter = ("created_at", "price")
