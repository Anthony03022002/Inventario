from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField()
    cantidad_ingresar = models.IntegerField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    codigo = models.CharField(max_length=100)
    categoria = models.CharField(max_length=100)
    fecha_creacion = models.DateField(auto_now_add=True)
    proveedor = models.CharField(max_length=255)
    estado = models.BooleanField(default=True)
    
    class Meta:
        db_table = 'productos'
    
    def __str__(self):
        return self.nombre