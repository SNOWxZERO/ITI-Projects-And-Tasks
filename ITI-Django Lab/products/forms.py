from django import forms
from .models import Product


class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = [
            "name",
            "code",
            "price",
            "image",
            "instock_items",
            "description",
            "category",
        ]
        widgets = {
            "name": forms.TextInput(attrs={"placeholder": "Ex: Wireless Mouse"}),
            "code": forms.TextInput(attrs={"placeholder": "Ex: WM-100"}),
            "price": forms.NumberInput(attrs={"step": "0.01"}),
            "instock_items": forms.NumberInput(),
            "description": forms.Textarea(attrs={"rows": 4}),
            "category": forms.Select(),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        for field in self.fields.values():
            field.widget.attrs.update({"class": "form-input"})
