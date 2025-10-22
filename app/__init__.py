# app/__init__.py
from flask import Flask
import os
from dotenv import load_dotenv


load_dotenv()  # .env を使う場合（任意）


def create_app():
    app = Flask(__name__, template_folder="../templates", static_folder="../static")


    # ルートの登録
    app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "default_dev_secret_key")
    print("SECRET_KEY:", app.config["SECRET_KEY"])

    from app.routes import store_bp, customer_bp, manager_bp

    app.register_blueprint(store_bp)
    app.register_blueprint(customer_bp)
    app.register_blueprint(manager_bp)

    return app