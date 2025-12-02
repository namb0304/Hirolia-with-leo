from flask import Flask, redirect, url_for
import os

def create_app():
    # __name__ は 'app' モジュールを指す
    # template_folder と static_folder を明示的に指定
    app = Flask(
        __name__,
        template_folder='templates',  # app/templates/
        static_folder='static'         # app/static/
    )
    
    app.config['SECRET_KEY'] = 'dev-secret-key-change-in-production'
    
    # デバッグ用: テンプレートフォルダのパスを出力
    print(f"Template folder: {app.template_folder}")
    print(f"Root path: {app.root_path}")
    
    # ルートページ: /customer/table にリダイレクト
    @app.route('/')
    def index():
        return redirect(url_for('customer.initial_setup'))
    
    # Blueprintの登録
    from app.routes.customer import customer_bp
    app.register_blueprint(customer_bp)
    
    return app