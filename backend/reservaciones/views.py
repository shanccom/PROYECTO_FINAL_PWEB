from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Cuarto, TipoCuarto, Reservacion
from .serializers import CuartoSerializer, TipoCuartoSerializer, ReservacionSerializer

class CuartoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cuarto.objects.all()
    serializer_class = CuartoSerializer

    @action(detail=False, methods=['get'])
    def disponibles(self, request):
        tipo_id = request.query_params.get('tipo')
        if tipo_id:
            queryset = self.queryset.filter(tipo_id=tipo_id)
        else:
            queryset = self.queryset
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class TipoCuartoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TipoCuarto.objects.all()
    serializer_class = TipoCuartoSerializer

class ReservacionViewSet(viewsets.ModelViewSet):
    queryset = Reservacion.objects.all()
    serializer_class = ReservacionSerializer