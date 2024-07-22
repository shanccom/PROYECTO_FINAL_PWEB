from django.urls import path, include
from .views import RegisterAPIView, LoginAPIView , UsuarioViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('register/', RegisterAPIView.as_view(), name='register_api'),
    path('login/', LoginAPIView.as_view(), name='login_api'),
    path('', include(router.urls)),
]   