import unittest
from app import app

class AppTestCase(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_register_route(self):
        # Try registering a test user
        response = self.client.post(
            "/api/register",
            json={"username": "testuser", "password": "testpass"}
        )
        # Accept 200 (success) or 409 (already exists)
        self.assertIn(response.status_code, [200, 409])

if __name__ == "__main__":
    unittest.main()
