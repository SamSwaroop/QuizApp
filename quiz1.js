const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var count=0

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
    startButton.innerText = 'Submit'
    startButton.classList.remove('hide')
    startButton.addEventListener('click',() => {
      console.log("The total score is " +count)
    })
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    count+=1
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
    question: 'A Whale is the biggest mammal underwater?',
    answers: [
      { text: 'YES', correct: true },
      { text: 'NO', correct: false }
    ]
  },
  {
    question: 'Which of the following is not an animal?',
    answers: [
      { text: 'Tiger', correct: false },
      { text: 'Snail', correct: false },
      { text: 'Owl', correct: false },
      { text: 'Rose', correct: true }
    ]
  },
  {
    question: 'What is the fastest land animal',
    answers: [
      { text: 'Zebra', correct: false },
      { text: 'Cheetah', correct: true },
      { text: 'Lion', correct: false },
      { text: 'Elephant', correct: false }
    ]
  },
  {
    question: 'Ostrich can fly',
    answers: [
      { text: 'YES', correct: false },
      { text: 'NO', correct: true }
    ]
  }
]