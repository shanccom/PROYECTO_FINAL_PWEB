from rest_framework import serializers
from .models import Cuarto, TipoCuarto

class CuartoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cuarto
        fields = '__all__'

class TipoCuartoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoCuarto
        fields = '__all__'