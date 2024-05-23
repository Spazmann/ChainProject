document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.querySelector('.send-button');
  
    sendButton.addEventListener('click', sendMessage);
  
    async function sendMessage() {
      const messageContent = messageInput.value.trim();
      if (!messageContent) return;
  
      const channelId = window.location.pathname.split('/').pop();
      const username = document.querySelector('.user-header-username').textContent;
  
      try {
        const response = await fetch('http://localhost:5109/message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            MessageContent: messageContent,
            Username: username,
            ChannelID: channelId
          })
        });
  
        if (response.ok) {
          messageInput.value = '';
          const newMessage = await response.json();
          appendMessageToList(newMessage);
        } else {
          console.error('Failed to send message:', response.statusText);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  
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
              <div class="message-username">${message.username}</div>
              <div class="message-date">${message.date}</div>
            </div>
            <div class="message-message">${message.messageContent}</div>
          </div>
        `;
        messageList.appendChild(messageItem);
      }
    }
  
    // Make sendMessage globally available
    window.sendMessage = sendMessage;
  });
  