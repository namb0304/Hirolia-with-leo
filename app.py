# app.py
from app import create_app

# Flaskアプリ生成
app = create_app()

if __name__ == "__main__":
    print("アクセスURL: http://localhost:2222")
    app.run(debug=True, port=2222)
