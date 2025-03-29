// const socket = io('http://localhost:80');
// const form = document.getElementById('send-container');
// const messsageInput = document.getElementById('messageInp');
// const messageContainer = document.querySelector(".container");

// const append = (message, position)=>{
// const messageElement = document.createElement('div');
// messageElement.innerText = message;
// messageElement.classList.add('message')
// messageElement.classList.add(position)
// messageContainer.append(messageElement)
// }

// const name = prompt("Please enter your name to join: ");
// socket.emit('new-user-joined', name);

// socket.on('user-joined', name =>{
// append(`${name} joined the chat`, 'right');
// });
const socket = io('http://localhost:80', {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionAttempts: 10
  });
  
  const form = document.getElementById('send-container');
  const messageInput = document.getElementById('messageInp');
  const messageContainer = document.querySelector(".container");
  
  const appendMessage = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
  }
  
  let userName;
  
  const handleNameInput = () => {
    userName = prompt("Please enter your name to join: ");
    if (userName) {
      socket.emit('new-user-joined', userName);
    } else {
      alert("Please enter a name to join the chat.");
    }
  }
  
  socket.on('connect', () => {
    console.log('Connected to the Socket.IO server');
    handleNameInput();
  });
  
  socket.on('disconnect', () => {
    console.log('Disconnected from the Socket.IO server');
  });
  
  socket.on('user-joined', (name) => {
    appendMessage(`${name} joined the chat`, 'right');
  });
  
  socket.on('receive', (data) => {
    appendMessage(`${data.name}: ${data.message}`, 'left');
  });
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
      socket.emit('send', { message, name: userName });
      appendMessage(`You: ${message}`, 'right');
      messageInput.value = '';
    } else {
      alert("Please enter a message to send.");
    }
  });
  
  socket.on('error', (error) => {
    console.error('Socket.IO error:', error);
  });