"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import json
api = Blueprint('api', __name__)



@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#NUEVO USUARIO
@api.route('/user', methods=['POST'])   
def create_new_user():
    body = json.loads(request.data)
    new_user = User(email=body["email"],password=body["password"], is_active=True)
    db.session.add(new_user)
    db.session.commit()
    response_body={
        "msg": ("usuario creado", new_user)
    }
    access_token = create_access_token(identity=body["email"])
    return jsonify(access_token=access_token)  



#login
@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email).first()
    if user is None: 
        return jsonify({"msg": "usuario no existe"}), 404

    if email != user.email or password != user.password:
        return jsonify({"msg": "Bad username or password"}), 401
    
    
    
    print(user)
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token)  
    # return jsonify("ok")  

#ruta protegida

# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
  
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

