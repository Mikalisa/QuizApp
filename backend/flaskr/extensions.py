from flask import request



# Paginate questions so we can view one question per page.
def paginate_questions(request, selection):
  QUESTIONS_PER_PAGE = 1
  page = request.args.get('page', 1, type=int)
  start = (page - 1) * QUESTIONS_PER_PAGE
  end = start + QUESTIONS_PER_PAGE
  questions = [question.format() for question in selection]
  current_questions = questions[start:end]
  return current_questions