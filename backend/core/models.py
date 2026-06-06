from django.db import models
from django.conf import settings
from django.utils import timezone

class Vendor(models.Model):
    class Status(models.TextChoices):
        ACTIVE = "ACTIVE", "Active"
        INACTIVE = "INACTIVE", "Inactive"
        BLACKLISTED = "BLACKLISTED", "Blacklisted"

    vendor_name = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    gst_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ACTIVE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.vendor_name

class RFQ(models.Model):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        SENT = "SENT", "Sent"

    title = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.DecimalField(max_digits=12, decimal_places=2)
    deadline = models.DateTimeField()
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name="rfqs")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    created_by = models.ForeignKey("accounts.User", on_delete=models.SET_NULL, null=True, related_name="created_rfqs")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.title} ({self.status})"

class Quotation(models.Model):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        SUBMITTED = "SUBMITTED", "Submitted"
        REJECTED = "REJECTED", "Rejected"
        ACCEPTED = "ACCEPTED", "Accepted"

    rfq = models.ForeignKey(RFQ, on_delete=models.CASCADE, related_name="quotations")
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name="quotations")
    price = models.DecimalField(max_digits=12, decimal_places=2)
    delivery_days = models.IntegerField()
    notes = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.SUBMITTED)
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-submitted_at"]
        unique_together = ("rfq", "vendor")

    def __str__(self):
        return f"Quote from {self.vendor.vendor_name} for {self.rfq.title}"

class Approval(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        APPROVED = "APPROVED", "Approved"
        REJECTED = "REJECTED", "Rejected"

    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE, related_name="approvals")
    approver = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="assigned_approvals")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    comment = models.TextField(blank=True)
    approved_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Approval for {self.quotation.rfq.title} by {self.approver.email}"

class PurchaseOrder(models.Model):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        ISSUED = "ISSUED", "Issued"
        ACCEPTED = "ACCEPTED", "Accepted"
        DELIVERED = "DELIVERED", "Delivered"
        CLOSED = "CLOSED", "Closed"

    po_number = models.CharField(max_length=50, unique=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name="purchase_orders")
    rfq = models.ForeignKey(RFQ, on_delete=models.CASCADE, related_name="purchase_orders", null=True, blank=True)
    quotation = models.OneToOneField(Quotation, on_delete=models.CASCADE, related_name="purchase_order", null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    issue_date = models.DateField(default=timezone.now)
    delivery_date = models.DateField(default=timezone.now)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"PO {self.po_number}"

class Invoice(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        PAID = "PAID", "Paid"
        OVERDUE = "OVERDUE", "Overdue"
        CANCELLED = "CANCELLED", "Cancelled"

    invoice_number = models.CharField(max_length=50, unique=True)
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name="invoices", null=True, blank=True)
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name="invoices", null=True, blank=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    due_date = models.DateField(default=timezone.now)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Invoice {self.invoice_number}"

class AuditLog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    action = models.CharField(max_length=255)
    entity_type = models.CharField(max_length=50)
    entity_id = models.IntegerField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-timestamp"]

    def __str__(self):
        return f"{self.user} - {self.action} on {self.entity_type} {self.entity_id}"
