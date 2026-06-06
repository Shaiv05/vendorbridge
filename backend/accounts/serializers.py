from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password
from .models import User, Role


PUBLIC_ROLES = {Role.PROCUREMENT_OFFICER, Role.MANAGER, Role.VENDOR}


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "role", "full_name", "is_active", "created_at")
        read_only_fields = ("id", "is_active", "created_at", "full_name")


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, max_length=72, validators=[validate_password])

    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "password", "role")

    def validate_role(self, value):
        if value not in PUBLIC_ROLES:
            raise serializers.ValidationError("Admin accounts cannot be self-registered.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value.lower()

    def create(self, validated):
        return User.objects.create_user(**validated)


class LoginSerializer(TokenObtainPairSerializer):
    username_field = "email"

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["role"] = user.role
        token["email"] = user.email
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data
