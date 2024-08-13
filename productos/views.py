from rest_framework import viewsets
from .serializer import productoSerializer
from .models import Producto
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class productoView(viewsets.ModelViewSet):
    serializer_class = productoSerializer
    queryset = Producto.objects.all()
    
    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated]
    