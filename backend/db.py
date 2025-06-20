import sqlite3
import bcrypt

DB_NAME = "devsync.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    ''')
    c.execute('''
        CREATE TABLE IF NOT EXISTS summaries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user TEXT,
            content TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    conn.commit()
    conn.close()

def register_user(username, password):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    try:
        password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
        c.execute("INSERT INTO users (username, password_hash) VALUES (?, ?)", (username, password_hash))
        conn.commit()
        return True
    except sqlite3.IntegrityError:
        return False
    finally:
        conn.close()

def validate_user(username, password):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT password_hash FROM users WHERE username = ?", (username,))
    row = c.fetchone()
    conn.close()
    if row and bcrypt.checkpw(password.encode(), row[0].encode()):
        return True
    return False

def save_summary(user, content):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute('INSERT INTO summaries (user, content) VALUES (?, ?)', (user, content))
    conn.commit()
    conn.close()

def get_summaries(user=None):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    if user:
        c.execute('SELECT content, timestamp FROM summaries WHERE user = ? ORDER BY timestamp DESC', (user,))
    else:
        c.execute('SELECT content, timestamp FROM summaries ORDER BY timestamp DESC')
    rows = c.fetchall()
    conn.close()
    return [{"summary": row[0], "timestamp": row[1]} for row in rows]
