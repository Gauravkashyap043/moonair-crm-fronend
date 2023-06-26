import React, { useState } from 'react';
import axios from 'axios';

function NotificationForm() {
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the webhook endpoint
      const response = await axios.post('http://localhost:4000/webhook', {
        message: message
      });

      if (response.status === 200) {
        alert('Notification sent!');
        // Reset the message input field
        setMessage('');
      } else {
        alert('Failed to send notification.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter a notification message"
      />
      <button type="submit">Send Notification</button>
    </form>
  );
}

export default NotificationForm;
