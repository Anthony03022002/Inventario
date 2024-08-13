from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import viewsets
from .serializer import clientesSerializer
from .models import Clientes

class ClientesView(viewsets.ModelViewSet):
    serializer_class = clientesSerializer
    queryset = Clientes.objects.all()
   
    authentication_classes = [TokenAuthentication]  
    permission_classes = [IsAuthenticated]
    
