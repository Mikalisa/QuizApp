import os
from sqlalchemy import Column, String, Integer, create_engine
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
import json

database_path = os.environ.get('CLEARDB_DATABASE_URL')

db = SQLAlchemy()

'''
setup_db(app)
    binds a flask application and a SQLAlchemy service
'''
def setup_db(app, database_path=database_path):
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.app = app
    db.init_app(app)
    db.create_all()

'''
Question

'''
class Question(db.Model):  
  __tablename__ = 'questions'

  id = Column(Integer, primary_key=True)
  question = Column(String)
  answer = Column(Integer)
  options = db.relationship('Options', backref='questions', cascade="all, delete-orphan", lazy='dynamic', primaryjoin="Question.id == Options.parent_id")
  

  def __init__(self, question, options, answer):
    self.question = question
    self.options = options
    self.answer = answer
  
  def insert(self):
    db.session.add(self)
    db.session.commit()
  
  def update(self):
    db.session.commit()

  def delete(self):
    db.session.delete(self)
    db.session.commit()

  def format(self):
    return {
      'id': self.id,
      'question': self.question,
      'answer': self.answer,
      'options': [option.format() for option in self.options.all()]
      }

'''
Answer

'''
class Options(db.Model):
  id = Column(Integer, primary_key=True)
  options = Column(String)
  percentage = Column(Integer, default=0)
  numOptionSelected = Column(Integer, default=0)
  parent_id = db.Column(Integer, db.ForeignKey('questions.id'))

  def __repr__(self):
        return f"Options('{self.options}', '{self.grade}')"
  

  def update(self):
    db.session.commit()
  def insert(self):
    db.session.add(self)
    db.session.commit()
  
  
  def format(self):
    return {
      'id': self.id,
      'option': self.options,
      'percentage': self.percentage,
      'numOptionSelected':self.numOptionSelected
    }

'''
Author

'''
class Author(db.Model, UserMixin):
    id = db.Column(Integer, primary_key=True)
    user_name = db.Column(String(32))
    user_email = db.Column(String(32))
  
    def update(self):
      db.session.commit()
    
    def insert(self):
      db.session.add(self)
      db.session.commit()

    


