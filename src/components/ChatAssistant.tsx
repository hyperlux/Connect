import React, { useEffect, useState } from 'react';
import { cline } from '../lib/cline';
import { ChatSession } from '../lib/cache';

export const ChatAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [session, setSession] = useState<ChatSession | null>(null);

  // Initialize chat session
  useEffect(() => {
    cline.startSession();
    const currentSession = cline.getCurrentSession();
    setSession(currentSession);
  }, []);

  // Handle sending messages
  const handleSend = async () => {
    if (!input.trim()) return;

    try {
      // Process the input and get response
      await cline.processInput(input);
      
      // Update the session state to show new messages
      const updatedSession = cline.getCurrentSession();
      setSession(updatedSession);
      
      // Clear input
      setInput('');
    } catch (error) {
      console.error('Error processing message:', error);
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto mb-4">
        {session?.messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.role === 'user' 
                ? 'bg-blue-100 ml-auto' 
                : 'bg-gray-100'
            }`}
          >
            <div className="font-semibold">
              {msg.role === 'user' ? 'You' : 'Cline'}:
            </div>
            <div>{msg.content}</div>
          </div>
        ))}
      </div>

      {/* Input area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};