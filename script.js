const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'HTML stands for?',
    answers: [
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'High Text Markup Language', correct: false },
      { text: 'Hyper Tabular Markup Language', correct: false },
      { text: 'None of these', correct: false }
    ]
  },
  {
    question: 'Which of the following tag is used to mark a begining of paragraph?',
    answers: [
      { text: '<td>', correct: false },
      { text: '<br>', correct: false },
      { text: '<p>', correct: true },
      { text: '<tr>', correct: false }
    ]
  },
  {
    question: 'Markup tags tell the web browser ___________.',
    answers: [
      { text: 'How to organise the page', correct: false },
      { text: 'How to display the page', correct: true },
      { text: 'How to display message box on page', correct: false },
      { text: 'None of these', correct: false }
    ]
  },
  {
    question: 'Web pages starts with which of the following tag?',
    answers: [
      { text: '<body>', correct: false },
      { text: '<title>', correct: false },
      { text: '<!DOCTYPE html>', correct: true },
      { text: '<form>', correct: false }
    ]
  },
  {
    question: 'The attribute, which define the relationship between current document and href URL is ___________.',
    answers: [
      { text: 'rel', correct: true },
      { text: 'url', correct: false },
      { text: 'rev', correct: false },
      { text: 'All of these', correct: false }
    ]
  },
  {
    question: 'How can you open a link in a new browser window?',
    answers: [
      { text: '< a href = "url" target = "new">', correct: false },
      { text: '<a href = "url" target= "_blank">', correct: true },
      { text: '<a href = "url".new>', correct: false },
      { text: '<a href = "url" target ="open">', correct: false }
    ]
  },
  {
    question: 'The latest HTML standard is ___________.',
    answers: [
      { text: 'XML', correct: false },
      { text: 'SGML', correct: false },
      { text: 'HTML 4.0', correct: false },
      { text: 'HTML 5.0', correct: true }
    ]
  }
]