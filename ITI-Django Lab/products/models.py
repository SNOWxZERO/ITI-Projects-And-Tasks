from django.db import models
from categories.models import Category

class Product(models.Model):
    name = models.CharField(max_length=200)
    code = models.CharField(max_length=10, unique=True, auto_created=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/images/', blank=True, null=True) 
    instock_items = models.PositiveIntegerField(default=0)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    category = models.ForeignKey(Category,related_name='products', on_delete=models.CASCADE)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.code})"
