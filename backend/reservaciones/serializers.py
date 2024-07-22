from rest_framework import serializers
from .models import Cuarto, TipoCuarto, Reservacion

class CuartoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuarto
        fields = '__all__'

class TipoCuartoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCuarto
        fields = '__all__'

class ReservacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservacion
        fields = ['id', 'usuario', 'cuarto', 'fecha_inicio', 'fecha_fin']