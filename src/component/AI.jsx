import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

function AIChat() {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1; // speaking speed (0.1–10)
      utterance.pitch = 1; // pitch (0–2)
      speechSynthesis.speak(utterance);
    } else {
      console.warn('SpeechSynthesis not supported in this browser.');
    }
  };

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    const userMsg = { text: prompt, sender: 'user', time: new Date().toLocaleTimeString() };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setPrompt('');

    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.post(
        'http://localhost:5000/ai',
        { prompt },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const aiReply = res.data.reply.trim();
      const aiMsg = { text: aiReply, sender: 'ai', time: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, aiMsg]);
      speak(aiReply); // 🗣️ Speak Gemini's reply
    } catch (err) {
      const errorText = '❌ Gemini API error: ' + (err.response?.data?.message || err.message);
      const errorMsg = { text: errorText, sender: 'ai', time: new Date().toLocaleTimeString() };
      setMessages((prev) => [...prev, errorMsg]);
      speak(errorText); // 🗣️ Speak error
    }
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="p-4 bg-gray-800 flex items-center space-x-3">
        <span className="text-2xl">🤖</span>
        <h1 className="text-xl font-bold">Gemini AI Chat</h1>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-xs ${
                msg.sender === 'user' ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              <p>{msg.text}</p>
              <p className="text-xs text-gray-300 mt-1">{msg.time}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="p-3 rounded-2xl max-w-xs bg-gray-700 animate-pulse">
            <p>🤖 Gemini is typing...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-800 flex space-x-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-3 rounded-full bg-gray-700 text-white focus:outline-none"
        />
        <button
          onClick={sendPrompt}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default AIChat;
