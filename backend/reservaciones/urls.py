from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CuartoViewSet, TipoCuartoViewSet, ReservacionViewSet

router = DefaultRouter()
router.register(r'cuartos', CuartoViewSet)
router.register(r'tipos', TipoCuartoViewSet)
router.register(r'reservaciones', ReservacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', include)
]