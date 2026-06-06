from django.utils import timezone
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from core.models import Vendor


class RegisterView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        if user.role == "VENDOR":
            Vendor.objects.get_or_create(
                email=user.email,
                defaults={
                    "vendor_name": user.full_name or user.email,
                    "category": "General",
                    "gst_number": f"AUTO{int(timezone.now().timestamp() * 1000)}",
                    "phone": "0000000000",
                    "address": "Auto-generated vendor profile",
                },
            )
        return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.user
        if user and user.role == "VENDOR":
            Vendor.objects.get_or_create(
                email=user.email,
                defaults={
                    "vendor_name": user.full_name or user.email,
                    "category": "General",
                    "gst_number": f"AUTO{int(timezone.now().timestamp() * 1000)}",
                    "phone": "0000000000",
                    "address": "Auto-generated vendor profile",
                },
            )
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RefreshView(TokenRefreshView):
    pass


class MeView(APIView):
    def get(self, request):
        return Response(UserSerializer(request.user).data)
