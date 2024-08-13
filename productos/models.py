from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=150)
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField() 
    
    class Meta:
        db_table = 'productos'
    
    def __str__(self):
        return self.nombre