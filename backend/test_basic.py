import unittest
from app import app

class BasicTest(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_register_route(self):
        response = self.app.post('/api/register', json={"username": "ci_test", "password": "pass"})
        self.assertIn(response.status_code, [200, 409])  # Accept if user already exists

if __name__ == "__main__":
    unittest.main()
