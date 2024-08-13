from django.db import models

# Create your models here.
class Clientes(models.Model):
    cedula = models.BigIntegerField()
    nombre = models.CharField(max_length=150)
    apellido = models.CharField(max_length=150)
    email = models.EmailField(max_length=120)
    celular = models.CharField(max_length=20)
    
    class Meta:
        db_table = 'clientes'
        
    def __str__(self):
        return self.nombre
    
