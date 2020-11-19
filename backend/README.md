# Full Stack QuizApp API Backend

Nowadays, it has become popular amongst internet users to spend some of their time testing their general knowledge through quizzes. QuizApp is an API provides endpoints to get questions and answer them for entertainment.

The application includes:

1) Display questions. 
2) Click to get the next question.
3) Show statistics on how the user’s answers compared to the other users that answered these questions before.
4) On the results page, show a range of different expertise levels for each grade bracket with a short description for each expertise level..
5) An authentication method to login users.
6) Share results on social media

The code adheres to the PEP 8 style guide

## Getting Started

### Installing Dependencies

#### Python 3.7

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

#### Virtual Enviornment

We recommend working within a virtual environment whenever using Python for projects. This keeps your dependencies for each project separate and organaized. Instructions for setting up a virual enviornment for your platform can be found in the [python docs](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/)

#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by naviging to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```

This will install all of the required packages we selected within the `requirements.txt` file.

##### Key Dependencies

- [Flask](http://flask.pocoo.org/)  is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) is the Python SQL toolkit and ORM we'll use handle the lightweight sqlite database. You'll primarily work in app.py and can reference models.py. 

- [Flask-CORS](https://flask-cors.readthedocs.io/en/latest/#) is the extension we'll use to handle cross origin requests from our frontend server. 

## Database Setup
The app is using sql database. The database file is located in the flaskr file. However, you can change to Postgres very easy by changing the database path in model.py


## Running the server

From within the `backend` directory first ensure you are working using your created virtual environment.

To run the server, execute:

```bash
export FLASK_APP=flaskr
export FLASK_ENV=development
flask run
```

Setting the `FLASK_ENV` variable to `development` will detect file changes and restart the server automatically.

Setting the `FLASK_APP` variable to `flaskr` directs flask to use the `flaskr` directory and the `__init__.py` file to find the application. 

The application is run on http://127.0.0.1:5000/ by default.



## API References

### Getting Started

- Base URL: At present this app can only run locally and is not hosted as a base URL.
- Authentication: This version of the application does not require API keys.

### Error Handling

Error are returned as JSON objects in the following format:
```bash

{
    "success": False,
    "error": 400,
    "message": "bad request"
}

```

The API will return two error types when request fail:

- 404: Not Found
- 422: Not processable

## Endpoints

### GET/ questions

- Return a list of questions objects, total_questions, current_category and categories.

- Sample curl http://127.0.0.1.5000/questions

```bash

{
  "questions": [
    {
      "answer": 5, 
      "id": 1, 
      "options": [
        {
          "id": 1, 
          "numOptionSelected": 0, 
          "option": "A - public static int main(String[] args)", 
          "percentage": 0
        }, 
        {
          "id": 2, 
          "numOptionSelected": 0, 
          "option": "B - public int main(String[] args)", 
          "percentage": 0
        }, 
        {
          "id": 5, 
          "numOptionSelected": 0, 
          "option": "C - public static void main(String[] args)", 
          "percentage": 0
        }, 
        {
          "id": 6, 
          "numOptionSelected": 0, 
          "option": "D - None of the above.", 
          "percentage": 0
        }
      ], 
      "question": "1 - What is correct syntax for main method of a java class?"
    }
  ]
}


```

POST '/questions/<int:option_id>'

- increment the number of the users who selected a specific option and calcualte statistics.
- Request argument: option_id:int

Example response:

```bash

{
  'success': True,
  'percentage': 30
}

```



GET '/users/'


- Add a new authorized user to the database. If the user is added, the below response will display

Example response:

```bash

{
  'success': True
        
}

```


## Testing
To run the tests, run
```
python test_flaskr.py
```