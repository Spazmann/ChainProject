document.addEventListener('DOMContentLoaded', function () {
  const socket = io('http://localhost:3000'); // Ensure this matches your server's address and port

  const messageInput = document.getElementById('messageInput');
  const sendButton = document.querySelector('.send-button');

  sendButton.addEventListener('click', sendMessage);

  function sendMessage() {
    const messageContent = messageInput.value.trim();
    if (!messageContent) return;

    const channelId = window.location.pathname.split('/').pop();
    const username = document.querySelector('.user-header-username').textContent;

    const message = {
      MessageContent: messageContent,
      Username: username,
      ChannelID: channelId
    };

    socket.emit('newMessage', message); 
    messageInput.value = '';
  }

  socket.on('message', (message) => {
    appendMessageToList(message);
  });

  function appendMessageToList(message) {
    const messageList = document.querySelector('.message-list');
    if (messageList) {
      const messageItem = document.createElement('div');
      messageItem.className = 'message-item';
      messageItem.innerHTML = `
        <div class="avatar">
          <img src="https://via.placeholder.com/40" alt="User Avatar">
        </div>
        <div class="message-info">
          <div class="message-stats">
            <div class="message-username">${message.Username}</div>
            <div class="message-date">${new Date().toLocaleString()}</div>
          </div>
          <div class="message-message">${message.MessageContent}</div>
        </div>
      `;
      messageList.prepend(messageItem);
    }
  }
});
