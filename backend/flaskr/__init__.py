import os
from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from .extensions import paginate_questions
from models import setup_db, Question, Options, Author


def create_app(test_config=None):
  # create and configure the app
  app = Flask(__name__)
  setup_db(app)
  CORS(app, resources={r"/api/*": {"origins": "*"}})

  '''
  After_request decorator to set Access-Control-Allow
  '''
  @app.after_request
  def after_request(response):
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST,PATCH, DELETE, OPTIONS')
    return response
    
    
  # Get questions
  @app.route('/questions')
  def questions():
    try:
      questions = Question.query.order_by(Question.id).all()
      current_questions = paginate_questions(request, questions)
      if len(current_questions) == 0:
        abort(404)
      
      return jsonify({
      'questions': current_questions
      })
    except:
      abort(422)


  # increment the number of the users who selected a specific option and calcualte statistics
  @app.route('/questions/<int:option_id>', methods=['POST'])
  def computeStatistcs(option_id):
    try:
      option = Options.query.filter(Options.id==option_id).one()
      usersNum = Author.query.count()
      option.numOptionSelected =  option.numOptionSelected + 1
      percentage = round((option.numOptionSelected / usersNum) * 100, 2)
      if(percentage > 100):
        option.numOptionSelected =  option.numOptionSelected - 1
        option.percentage = round((option.numOptionSelected / usersNum) * 100, 2)
        option.insert()
      else:
        option.percentage = percentage
        option.insert()

      return jsonify({
        'success': True,
        'percentage': option.percentage
      })

    except:
      abort(422)
    
  # Add a new authorized user to the database
  @app.route('/users/', methods=['POST'])
  def addUser():
    try:
      body = request.get_json()
      if not ('email' in body and ('given_name' in body or 'nickname' in body)):
        abort(404)
      name = body.get('given_name', None)
      email = body.get('email', None)
      user = Author.query.filter_by(user_email=email).first()
      
      if not user:
        if (name is None):
          name = body.get('nickname', None)
          new_user = Author(user_name=name, user_email=email)
        else:
          new_user = Author(user_name=name, user_email=email)
        new_user.insert()
       

      
      return jsonify({
        'success': True
        
        })
    except:
      abort(422)


  # error handlers for all expected errors 
  @app.errorhandler(404)
  def not_found(error):
    return jsonify({
        "success": False, 
        "error": 404,
        "message": "Not found"
        }), 404


  @app.errorhandler(422)
  def unprocessable(error):
    return jsonify({
      "success": False, 
      "error": 422,
      "message": "unprocessable"
      }), 422


  return app

    