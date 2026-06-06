from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .views import VendorViewSet, RFQViewSet, QuotationViewSet

class HealthView(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        return Response({"status": "ok", "service": "VendorBridge"})

router = DefaultRouter()
router.register(r"vendors", VendorViewSet, basename="vendor")
router.register(r"rfqs", RFQViewSet, basename="rfq")
router.register(r"quotations", QuotationViewSet, basename="quotation")

urlpatterns = [
    path("health/", HealthView.as_view()),
    path("", include(router.urls)),
]
