FROM python:3.7-alpine

WORKDIR /code
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=127.0.0.1

RUN pip install --upgrade pip
RUN pip install pytest==4.0.2
RUN pip install PyJWT
RUN pip install Flask
RUN pip install gunicorn
RUN pip install pytest
RUN pip install -r requirements.txt

EXPOSE 5000
COPY . .
CMD ["flask", "run"]