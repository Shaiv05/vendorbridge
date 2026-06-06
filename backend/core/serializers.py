from rest_framework import serializers
from .models import Vendor, RFQ, Quotation, Approval, PurchaseOrder, Invoice, AuditLog

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

class RFQSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source="vendor.vendor_name", read_only=True)
    
    class Meta:
        model = RFQ
        fields = "__all__"
        read_only_fields = ("id", "created_by", "created_at", "updated_at")

class QuotationSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source="vendor.vendor_name", read_only=True)
    rfq_title = serializers.CharField(source="rfq.title", read_only=True)

    class Meta:
        model = Quotation
        fields = "__all__"
        read_only_fields = ("id", "submitted_at", "updated_at")

class ApprovalSerializer(serializers.ModelSerializer):
    approver_email = serializers.CharField(source="approver.email", read_only=True)
    
    class Meta:
        model = Approval
        fields = "__all__"
        read_only_fields = ("id", "created_at", "approved_at")

class PurchaseOrderSerializer(serializers.ModelSerializer):
    vendor_name = serializers.CharField(source="vendor.vendor_name", read_only=True)
    rfq_title = serializers.CharField(source="rfq.title", read_only=True)

    class Meta:
        model = PurchaseOrder
        fields = "__all__"
        read_only_fields = ("id", "po_number", "created_at", "updated_at")

class InvoiceSerializer(serializers.ModelSerializer):
    po_number = serializers.CharField(source="purchase_order.po_number", read_only=True)
    vendor_name = serializers.CharField(source="purchase_order.vendor.vendor_name", read_only=True)

    class Meta:
        model = Invoice
        fields = "__all__"
        read_only_fields = ("id", "created_at", "updated_at")

class AuditLogSerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source="user.email", read_only=True)
    class Meta:
        model = AuditLog
        fields = "__all__"
