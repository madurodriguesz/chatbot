const chatContainer = document.getElementById('chat-container');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
let knowledgeBase = null;

// Função para fazer uma requisição AJAX para carregar o arquivo JSON
function loadKnowledgeBase(callback) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');
  xhr.open('GET', 'knowledgeBase.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      knowledgeBase = JSON.parse(xhr.responseText);
      callback();
    }
  };
  xhr.send(null);
}

function displayMessage(message, isUserMessage = false) {
  const chatMessage = document.createElement('div');
  chatMessage.className = isUserMessage ? 'user-message' : 'bot-message';
  chatMessage.textContent = isUserMessage ? 'Você: ' + message : 'Bot: ' + message;
  chatContainer.appendChild(chatMessage);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function processUserInput() {
  const question = userInput.value;
  displayMessage(question, true);
  const answer = getAnswer(question);
  displayMessage(answer);
  userInput.value = '';
}

function getAnswer(question) {
  return knowledgeBase[question] || 'Desculpe, não entendi sua pergunta.';
}

// Carrega o arquivo JSON e inicia o chatbot após o carregamento
loadKnowledgeBase(function () {
  submitBtn.addEventListener('click', processUserInput);

  userInput.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      processUserInput();
    }
  });
});
