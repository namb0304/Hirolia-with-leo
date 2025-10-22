from flask import Blueprint

store_bp = Blueprint(
    "store", __name__, url_prefix="/store", template_folder="../../templates"
)