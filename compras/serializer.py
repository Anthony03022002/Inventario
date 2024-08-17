from rest_framework import serializers
from .models import  Compras

class comprasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compras
        fields = '__all__'  
        