import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;

// Dispaying loader
function loader(element) {
  element.textContent = '';
  loadInterval = setInterval(() => {
    element.textContent += '.';
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

// Make typing interval btw letters
function typeText(element, text) {
  index = 0;
  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.chartAt(index);
      index++;
    } else {
      clearInterval(interval);
    }
  }, 20);
}

// Generating unique Id
function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return (`id - ${timestamp}-${hexadecimalString}`);
}

// Create a function for making chat stipes
function chatStripe(isAi, value, uniqueId) {
  return (`<div class = "wrapper ${isAi && 'ai'}">
        <div class = "chat">
          <div class = "profile">
            <img src= "${isAi ? bot : user}"
            alt= "${isAi ? 'bot' : 'user'}/>
          </div>
          <div class="message" id= ${uniqueId}>${value}</div>
        </div>
      </div>`
    );
}


// Handling Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  //User's chatStripe
  chatContainer.innerHTML += chatStripe(false, data.get('prompt'));
  form.reset();

  //Bot's chatStripe
  const uniqueId = generateUniqueId();
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);
  loader(messageDiv);
};

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    handleSubmit(e);
  }
});
