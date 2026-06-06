from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Vendor, RFQ, Quotation
from .serializers import VendorSerializer, RFQSerializer, QuotationSerializer

class IsProcurementOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return request.user.role in ["ADMIN", "PROCUREMENT_OFFICER"]

class VendorViewSet(viewsets.ModelViewSet):
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    
    def get_permissions(self):
        if self.action in ["list", "retrieve"]:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsProcurementOrAdmin]
        return [permission() for permission in permission_classes]

class RFQViewSet(viewsets.ModelViewSet):
    queryset = RFQ.objects.all()
    serializer_class = RFQSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        if self.action in ["list", "retrieve", "comparison"]:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsProcurementOrAdmin]
        return [permission() for permission in permission_classes]

    @action(detail=True, methods=["get"])
    def comparison(self, request, pk=None):
        rfq = self.get_object()
        quotes = rfq.quotations.filter(status="SUBMITTED").order_by("price")
        serializer = QuotationSerializer(quotes, many=True)
        
        # Add basic analytics
        data = serializer.data
        if data:
            lowest_price = min(float(q["price"]) for q in data)
            fastest_delivery = min(int(q["delivery_days"]) for q in data)
            for q in data:
                q["is_lowest_price"] = float(q["price"]) == lowest_price
                q["is_fastest_delivery"] = int(q["delivery_days"]) == fastest_delivery
        
        return Response(data)

class QuotationViewSet(viewsets.ModelViewSet):
    queryset = Quotation.objects.all()
    serializer_class = QuotationSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == "VENDOR":
            # Find the vendor associated with this user's email if possible
            return Quotation.objects.filter(vendor__email=user.email)
        return Quotation.objects.all()

    def get_permissions(self):
        if self.action == "create":
            permission_classes = [permissions.IsAuthenticated] # Vendors can create
        elif self.action in ["list", "retrieve"]:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsProcurementOrAdmin] # Only procurement can accept/reject
        return [permission() for permission in permission_classes]
