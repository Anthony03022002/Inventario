from django.urls import path, include
from rest_framework import routers
from productos import views
from rest_framework.documentation import include_docs_urls
from .views import UploadExcelView, UploadXMLView

router = routers.DefaultRouter()
router.register(r'productos', views.productoView, 'productos')

urlpatterns = [
    path('productos/', include(router.urls)),
    path('cargar-xml/', UploadXMLView.as_view(), name='cargar-xml'),
   path('upload-excel/', UploadExcelView.as_view(), name='upload-excel'),
]