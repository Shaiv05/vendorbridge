from rest_framework import serializers
from .models import Vendor, RFQ, Quotation

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
