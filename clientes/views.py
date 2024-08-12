from rest_framework import viewsets
from .serializer import clientesSerializer
from .models import Clientes

class ClientesView(viewsets.ModelViewSet):
    serializer_class = clientesSerializer
    queryset = Clientes.objects.all()