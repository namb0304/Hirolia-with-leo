from flask import Blueprint

manager_bp = Blueprint(
    "manager", __name__, url_prefix="/manager", template_folder="../../templates"
)