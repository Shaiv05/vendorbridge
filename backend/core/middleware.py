from .models import AuditLog

class AuditMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated and request.method in ["POST", "PUT", "PATCH", "DELETE"]:
            # Basic audit for now: track user action and request path
            AuditLog.objects.create(
                user=request.user,
                action=f"{request.method} {request.path}",
                entity_type=request.path.split('/')[2] if len(request.path.split('/')) > 2 else "unknown",
                entity_id=0 
            )
        return response
