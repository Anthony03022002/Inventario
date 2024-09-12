from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Clientes(models.Model):
    identificacion= models.CharField(max_length=2)
    cedula = models.CharField(max_length=20)
    nombre = models.CharField(max_length=150)
    apellido = models.CharField(max_length=150)
    email = models.EmailField(max_length=120)
    celular = models.CharField(max_length=20)
    estado = models.BooleanField()
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    class Meta:
        db_table = 'clientes'
        
    def __str__(self):
        return self.nombre
    
