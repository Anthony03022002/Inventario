from rest_framework import viewsets

from clientes.serializer import clientesSerializer
from productos.serializer import productoSerializer
from .serializer import comprasSerializer
from .models import Compras
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class comprasView(viewsets.ModelViewSet):
    serializer_class = comprasSerializer
    queryset = Compras.objects.all()
    
    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
    
    def get_queryset(self):
        user = self.request.user
        return Compras.objects.filter(usuario=user)