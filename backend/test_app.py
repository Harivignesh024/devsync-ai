# backend/test_app.py
import unittest
import json
from app import app

class DevSyncAppTest(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()
        self.username = "testuser"
        self.password = "testpass"

    def test_register_and_login(self):
        # Register
        response = self.client.post("/api/register", json={
            "username": self.username,
            "password": self.password
        })
        self.assertIn(response.status_code, [200, 409])  # 409 if already exists

        # Login
        response = self.client.post("/api/login", json={
            "username": self.username,
            "password": self.password
        })
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("access_token", data)
        self.token = data["access_token"]

    def test_generate_summary_unauthorized(self):
        # Without token
        response = self.client.post("/api/generate", json={
            "events": ["did task A", "completed task B"]
        })
        self.assertEqual(response.status_code, 401)

    def test_generate_summary_authorized(self):
        # First login
        login_response = self.client.post("/api/login", json={
            "username": self.username,
            "password": self.password
        })
        token = login_response.get_json()["access_token"]

        # Generate summary
        response = self.client.post("/api/generate",
            json={"events": ["completed bug fix", "deployed to prod"]},
            headers={"Authorization": f"Bearer {token}"}
        )
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertIn("summary", data)

if __name__ == "__main__":
    unittest.main()
