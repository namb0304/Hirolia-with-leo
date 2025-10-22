from flask import Blueprint, render_template

store_bp = Blueprint(
    "store", __name__, url_prefix="/store", template_folder="../../templates"
)


store_bp.route("/store/login", methods=["GET", "POST"])
def store_login():
    return render_template("store/login.html")