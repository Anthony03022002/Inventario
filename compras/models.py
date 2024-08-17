from django.db import models

from clientes.models import Clientes
from productos.models import Producto
from django.contrib.auth.models import User

# Create your models here.
class Compras(models.Model):
    cliente = models.ForeignKey(Clientes, on_delete=models.CASCADE )
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    fecha = models.DateField()
    cantidad = models.PositiveIntegerField()
    usuario = models.ForeignKey(User,blank=True, null=True, on_delete=models.CASCADE)

    class Meta:
        db_table = 'compras'
   

    def __str__(self):
        return f'{self.cliente.nombre} - {self.producto.nombre}'
    

    