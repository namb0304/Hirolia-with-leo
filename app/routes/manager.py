from flask import Blueprint, render_template

manager_bp = Blueprint(
    "manager", __name__, url_prefix="/manager", template_folder="../../templates"
)

@manager_bp.route("/login", methods=["GET", "POST"])
def manager_login():
    return render_template("manager/manager_login.html")

@manager_bp.route('/menu_management', methods=['GET', 'POST'])
def menu_management():
    return render_template("manager/menu_management.html")

@manager_bp.route('/sale_management', methods=['GET', 'POST'])
def sale_management():
    return render_template("manager/sale_management.html")

@manager_bp.route('/menu_creation', methods=['GET', 'POST'])
def menu_creation():
    return render_template("manager/menu_creation.html")