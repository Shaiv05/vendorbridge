from django.db import models

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

    rfq = models.ForeignKey(RFQ, on_delete=models.CASCADE, related_name="approvals", null=True, blank=True)
    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE, related_name="approvals", null=True, blank=True)
    approver = models.ForeignKey("accounts.User", on_delete=models.CASCADE, related_name="assigned_approvals")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    comments = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        target = self.rfq.title if self.rfq else f"Quote {self.quotation.id}"
        return f"Approval for {target} by {self.approver.email}"

class PurchaseOrder(models.Model):
    class Status(models.TextChoices):
        DRAFT = "DRAFT", "Draft"
        ISSUED = "ISSUED", "Issued"
        RECEIVED = "RECEIVED", "Received"
        CANCELLED = "CANCELLED", "Cancelled"

    po_number = models.CharField(max_length=50, unique=True)
    quotation = models.OneToOneField(Quotation, on_delete=models.CASCADE, related_name="purchase_order")
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name="purchase_orders")
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)
    created_by = models.ForeignKey("accounts.User", on_delete=models.SET_NULL, null=True, related_name="created_pos")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"PO {self.po_number} ({self.vendor.vendor_name})"

class Invoice(models.Model):
    class Status(models.TextChoices):
        UNPAID = "UNPAID", "Unpaid"
        PAID = "PAID", "Paid"
        OVERDUE = "OVERDUE", "Overdue"

    invoice_number = models.CharField(max_length=50, unique=True)
    purchase_order = models.ForeignKey(PurchaseOrder, on_delete=models.CASCADE, related_name="invoices")
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.UNPAID)
    due_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Invoice {self.invoice_number} for PO {self.purchase_order.po_number}"
