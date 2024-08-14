from rest_framework import serializers

from clientes.models import Clientes
from clientes.serializer import clientesSerializer
from productos.models import Producto
from productos.serializer import productoSerializer
from .models import Compras

class comprasSerializer(serializers.ModelSerializer):
    cliente = serializers.PrimaryKeyRelatedField(queryset=Clientes.objects.all())
    producto = serializers.PrimaryKeyRelatedField(queryset=Producto.objects.all())
    class Meta:
        model = Compras
        fields = '__all__'