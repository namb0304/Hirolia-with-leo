from flask import Blueprint, render_template

store_bp = Blueprint("store_bp", __name__, url_prefix="/store", template_folder="../../templates")


@store_bp.route("/login", methods=["GET", "POST"])
def store_login():
    return render_template("store/login.html")


@store_bp.route("/seat_status", methods=["GET", "POST"])
def store_seat_status():
    return render_template("store/seat_status.html")

@store_bp.route("/order_status", methods=["GET", "POST"])
def store_order_status():
    return render_template("store/order_status.html")
