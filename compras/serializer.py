from rest_framework import serializers

from clientes.serializer import clientesSerializer
from productos.serializer import productoSerializer
from .models import Compras

class comprasSerializer(serializers.ModelSerializer):
    cliente = clientesSerializer(read_only=True)
    producto = productoSerializer(read_only=True)
    class Meta:
        model = Compras
        fields = '__all__'