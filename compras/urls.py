from django.urls import path, include
from rest_framework import routers
from compras import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'compras', views.comprasView, 'compras')
router.register(r'comprasProducto', views.comprasView, 'compraProducto')


urlpatterns = [
    path('compras/', include(router.urls)),
    path('comprasProducto/', include(router.urls)),
]