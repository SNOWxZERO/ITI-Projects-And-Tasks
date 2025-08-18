from django.urls import path
from . import views

app_name = 'products'

urlpatterns = [
    path('', views.product_list, name='list'),                 # /products/
    path('create/', views.product_create, name='create'),      # /products/create/
    path('<int:pk>/', views.product_detail, name='detail'),    # /products/1/
    path('<int:pk>/edit/', views.product_edit, name='edit'),   # /products/1/edit/
    path('<int:pk>/delete/', views.product_delete, name='delete'), # /products/1/delete/
]
