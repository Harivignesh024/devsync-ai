import unittest
from app import app

class DevSyncTest(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_generate_summary(self):
        res = self.client.post("/api/generate", json={"events": ["Fix bug"], "user": "Tester"})
        self.assertEqual(res.status_code, 200)
        self.assertIn("summary", res.get_json())

    def test_get_history(self):
        res = self.client.get("/api/history")
        self.assertEqual(res.status_code, 200)

    def test_github_api(self):
        res = self.client.get("/api/github/octocat")
        self.assertIn(res.status_code, [200, 404])

if __name__ == "__main__":
    unittest.main()
