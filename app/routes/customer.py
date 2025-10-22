from flask import Blueprint

customer_bp = Blueprint(
    "customer", __name__, url_prefix="/customer", template_folder="../../templates"
)