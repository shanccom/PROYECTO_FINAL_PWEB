from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CuartoViewSet, TipoCuartoViewSet

router = DefaultRouter()
router.register(r'cuartos', CuartoViewSet)
router.register(r'tipos', TipoCuartoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', include)
]