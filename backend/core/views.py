from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.http import HttpResponse
from django.utils import timezone
from reportlab.pdfgen import canvas
import io
from .models import Vendor, RFQ, Quotation, Approval, PurchaseOrder, Invoice
from .serializers import (
    VendorSerializer, RFQSerializer, QuotationSerializer, 
    ApprovalSerializer, PurchaseOrderSerializer, InvoiceSerializer
)

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
            return Quotation.objects.filter(vendor__email=user.email)
        return Quotation.objects.all()

    def get_permissions(self):
        if self.action == "create":
            permission_classes = [permissions.IsAuthenticated]
        elif self.action in ["list", "retrieve"]:
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [IsProcurementOrAdmin]
        return [permission() for permission in permission_classes]

class ApprovalViewSet(viewsets.ModelViewSet):
    queryset = Approval.objects.all()
    serializer_class = ApprovalSerializer

    def get_queryset(self):
        user = self.request.user
        if user.role == "MANAGER":
            return Approval.objects.filter(approver=user)
        return Approval.objects.all()

    def get_permissions(self):
        return [permissions.IsAuthenticated()]

    @action(detail=True, methods=["post"])
    def decide(self, request, pk=None):
        approval = self.get_object()
        if request.user.role != "MANAGER":
            return Response({"detail": "Only managers can approve."}, status=403)
        
        status_val = request.data.get("status")
        if status_val not in ["APPROVED", "REJECTED"]:
            return Response({"detail": "Invalid status."}, status=400)
        
        approval.status = status_val
        approval.comment = request.data.get("comment", "")
        approval.approved_at = timezone.now()
        approval.save()
        return Response(ApprovalSerializer(approval).data)

class PurchaseOrderViewSet(viewsets.ModelViewSet):
    queryset = PurchaseOrder.objects.all()
    serializer_class = PurchaseOrderSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_permissions(self):
        return [IsProcurementOrAdmin()]

    @action(detail=True, methods=["get"])
    def download_pdf(self, request, pk=None):
        po = self.get_object()
        buffer = io.BytesIO()
        p = canvas.Canvas(buffer)
        p.drawString(100, 750, f"Purchase Order: {po.po_number}")
        p.drawString(100, 730, f"Vendor: {po.vendor.vendor_name}")
        p.drawString(100, 710, f"Amount: {po.total_amount}")
        p.showPage()
        p.save()
        pdf = buffer.getvalue()
        buffer.close()
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = f'attachment; filename="PO_{po.po_number}.pdf"'
        return response

class InvoiceViewSet(viewsets.ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

    def get_permissions(self):
        return [permissions.IsAuthenticated()]
