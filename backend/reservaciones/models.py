from django.db import models
from django.conf import settings
from django.utils import timezone

class TipoCuarto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    precio_por_noche = models.DecimalField(max_digits=8, decimal_places=2)
    imagen = models.URLField(max_length=200)

    def __str__(self):
        return self.nombre

class Cuarto(models.Model):
    tipo = models.ForeignKey(TipoCuarto, on_delete=models.CASCADE)
    numero = models.CharField(max_length=10, unique=True)

    def __str__(self):
        return f"{self.tipo.nombre} - {self.numero}"

class Reservacion(models.Model):
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cuarto = models.OneToOneField(Cuarto, on_delete=models.CASCADE)
    fecha_inicio = models.DateTimeField()
    fecha_fin = models.DateTimeField()

    def __str__(self):
        return f"Reservación de {self.usuario} en {self.cuarto} desde {self.fecha_inicio} hasta {self.fecha_fin}"

    @property
    def duracion(self):
        return (self.fecha_fin - self.fecha_inicio).days

    @property
    def costo_total(self):
        precio_por_noche = self.cuarto.tipo.precio_por_noche
        return precio_por_noche * self.duracion