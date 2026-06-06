#!/usr/bin/env python3
"""Test VendorBridge APIs"""

import requests
import json
from datetime import datetime

BASE_URL = "http://localhost:8000/api"

def test_registration():
    """Test user registration"""
    print("\n" + "="*60)
    print("TEST 1: User Registration")
    print("="*60)
    
    payload = {
        "email": f"vendor{datetime.now().timestamp()}@example.com",
        "password": "VendorPass123",
        "first_name": "Vendor",
        "last_name": "User",
        "role": "VENDOR"
    }
    
    print(f"Registering user: {payload['email']}")
    response = requests.post(f"{BASE_URL}/auth/register/", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response body: {response.text[:500]}")
    try:
        data = response.json()
        print(f"Response JSON: {json.dumps(data, indent=2)}")
        return response.status_code == 201, payload, data.get('email') if isinstance(data, dict) else None
    except Exception as e:
        print(f"Error parsing JSON: {e}")
        return False, payload, None

def test_login(email, password):
    """Test user login"""
    print("\n" + "="*60)
    print("TEST 2: User Login")
    print("="*60)
    
    payload = {
        "email": email,
        "password": password
    }
    
    print(f"Logging in: {email}")
    response = requests.post(f"{BASE_URL}/auth/login/", json=payload)
    print(f"Status: {response.status_code}")
    data = response.json()
    print(f"Response keys: {list(data.keys())}")
    
    if response.status_code == 200:
        print(f"✅ Login successful")
        print(f"   - Has access token: {'access' in data}")
        print(f"   - Has refresh token: {'refresh' in data}")
        if 'access' in data:
            print(f"   - Access token type: {type(data['access'])}")
        return True, data.get('access')
    else:
        print(f"Response: {json.dumps(data, indent=2)}")
        return False, None

def test_me_endpoint(access_token):
    """Test current user endpoint"""
    print("\n" + "="*60)
    print("TEST 3: Get Current User (/auth/me)")
    print("="*60)
    
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    
    print(f"Fetching user info with token...")
    response = requests.get(f"{BASE_URL}/auth/me/", headers=headers)
    print(f"Status: {response.status_code}")
    print(f"Response: {json.dumps(response.json(), indent=2)}")
    
    return response.status_code == 200

def test_unauthorized():
    """Test unauthorized request"""
    print("\n" + "="*60)
    print("TEST 4: Unauthorized Request (no token)")
    print("="*60)
    
    print(f"Fetching /auth/me without token...")
    response = requests.get(f"{BASE_URL}/auth/me/")
    print(f"Status: {response.status_code}")
    print(f"Should be 401: {response.status_code == 401}")
    
    return response.status_code == 401

if __name__ == "__main__":
    print("\n🚀 VendorBridge API Tests")
    print(f"Base URL: {BASE_URL}")
    
    # Test registration
    reg_success, user_data, user_email = test_registration()
    
    if reg_success and user_email:
        # Test login
        login_success, access_token = test_login(user_data['email'], user_data['password'])
        
        if login_success and access_token:
            # Test me endpoint
            test_me_endpoint(access_token)
    
    # Test unauthorized
    test_unauthorized()
    
    print("\n" + "="*60)
    print("✅ API Tests Complete")
    print("="*60)
