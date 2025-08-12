import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, FileText, Search, List, Eye } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  steps?: string[];
  links?: Array<{ label: string; url: string }>;
  checklist?: Array<{ item: string; done: boolean }>;
}

interface ChatInterfaceProps {
  processTitle: string;
  processId: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ processTitle, processId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickActions = [
    { id: 'summary', label: 'View Process Summary', icon: Eye },
    { id: 'jump', label: 'Jump to Step', icon: List },
    { id: 'search', label: 'Search in Process', icon: Search }
  ];

  const samplePrompts = [
    "What's the leave approval process?",
    "Who needs to sign off on this?",
    "What documents are required?",
    "How long does this process take?"
  ];

  useEffect(() => {
    // Initial welcome message for the selected process
    const welcomeMessage: Message = {
      id: '1',
      type: 'bot',
      content: `Hi! I'm ready to help you with "${processTitle}". What would you like to know about this process?`,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [processTitle]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: `Based on "${processTitle}", here's what I found...`,
        timestamp: new Date(),
        steps: [
          "Employee submits request through portal",
          "Manager reviews and approves/denies",
          "HR processes the approved request",
          "Employee receives confirmation"
        ],
        links: [
          { label: "Request Form", url: "#" },
          { label: "Policy Document", url: "#" }
        ],
        checklist: [
          { item: "Submit request with required documents", done: false },
          { item: "Wait for manager approval", done: false },
          { item: "Check email for updates", done: false }
        ]
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleQuickAction = (actionId: string) => {
    // Placeholder for quick action functionality
    console.log(`Quick action: ${actionId} for process: ${processId}`);
  };

  const handlePromptClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-lg">{processTitle}</h3>
            <p className="text-xs text-blue-100">
              {isTyping ? 'ProcessBuddy is typing...' : 'Ready to help'}
            </p>
          </div>
        </div>
        
        {/* Glowing Bot Icon */}
        <div className={`w-10 h-10 bg-white/20 rounded-full flex items-center justify-center ${isTyping ? 'animate-pulse' : ''}`}>
          <Bot className={`w-5 h-5 text-white ${isTyping ? 'animate-bounce' : ''}`} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action.id}
              onClick={() => handleQuickAction(action.id)}
              className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 border border-gray-200 dark:border-gray-500"
            >
              <action.icon className="w-4 h-4" />
              <span>{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div
                className={`p-4 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                
                {/* Steps */}
                {message.steps && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold opacity-80">Process Steps:</p>
                    {message.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3 text-sm">
                        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="flex-1">{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Links */}
                {message.links && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold opacity-80">Related Documents:</p>
                    <div className="flex flex-wrap gap-2">
                      {message.links.map((link, index) => (
                        <a
                          key={index}
                          href={link.url}
                          className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Checklist */}
                {message.checklist && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-semibold opacity-80">Action Items:</p>
                    <div className="space-y-2">
                      {message.checklist.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            checked={item.done}
                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            readOnly
                          />
                          <span className={item.done ? 'line-through opacity-60' : ''}>
                            {item.item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 px-4">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
            
            {/* Avatar */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
              message.type === 'user' ? 'order-1 ml-3' : 'order-2 mr-3'
            }`}>
              {message.type === 'user' ? (
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              ) : (
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-2xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Sample Prompts */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            Try asking:
          </p>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-xs px-3 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Type a question about your process..."
            className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
          Example: What's the leave approval process?
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;