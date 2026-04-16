import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  Mic, 
  Image, 
  Sparkles, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  RefreshCw,
  MoreVertical,
  X
} from 'lucide-react';

export default function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: '¡Hola! Soy tu asistente de IA personal. Puedo ayudarte con tareas, responder preguntas, generar contenido, analizar datos y mucho más. ¿En qué puedo asistirte hoy?',
      timestamp: new Date().toISOString(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        role: 'assistant',
        content: generateAIResponse(inputValue),
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input) => {
    const responses = [
      'Excelente pregunta. Basado en mi análisis, te recomendaría considerar los siguientes puntos clave para optimizar tu enfoque...',
      'He procesado tu solicitud. Aquí tienes un resumen ejecutivo con los aspectos más relevantes...',
      'Interesante perspectiva. Permíteme desglosar esto en componentes accionables que puedas implementar inmediatamente...',
      'Entiendo perfectamente. Como tu asistente personalizado, sugiero la siguiente estrategia adaptada a tus objetivos...',
      'Analizando tu patrón de comportamiento histórico, veo una oportunidad clara de mejora en esta área...'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const suggestions = [
    'Resume este documento',
    'Genera ideas para mi proyecto',
    'Analiza mis patrones de productividad',
    'Crea un plan de aprendizaje',
    'Optimiza mi rutina diaria'
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card mb-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Asistente IA</h1>
              <p className="text-dark-400 text-sm">Tu compañero inteligente 24/7</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              En línea
            </span>
          </div>
        </div>
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 mb-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] lg:max-w-[70%] ${message.role === 'user' ? 'order-1' : 'order-2'}`}>
                <div className={`card ${message.role === 'user' ? 'bg-primary-500/20 border-primary-500/30' : ''}`}>
                  <p className="text-dark-100 leading-relaxed">{message.content}</p>
                  
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-3 pt-3 border-t border-dark-700/50">
                      <button className="text-dark-400 hover:text-dark-300 transition-colors p-1">
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="text-dark-400 hover:text-green-400 transition-colors p-1">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button className="text-dark-400 hover:text-red-400 transition-colors p-1">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                      <button className="text-dark-400 hover:text-primary-400 transition-colors p-1">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="text-dark-400 hover:text-dark-300 transition-colors p-1 ml-auto">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  
                  <p className="text-xs text-dark-500 mt-2">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mx-3 ${
                message.role === 'user' ? 'order-2 bg-primary-500' : 'order-1 gradient-primary'
              }`}>
                {message.role === 'user' ? (
                  <span className="font-semibold text-white">Tú</span>
                ) : (
                  <Sparkles className="w-5 h-5 text-white" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="card py-3 px-4">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-dark-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {messages.length < 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <p className="text-sm text-dark-400 mb-2">Sugerencias:</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => setInputValue(suggestion)}
                className="px-4 py-2 rounded-xl glass text-sm hover:bg-white/10 transition-all duration-300"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-2"
      >
        <div className="flex items-center gap-2">
          <button className="p-3 text-dark-400 hover:text-dark-300 transition-colors rounded-xl hover:bg-dark-800/50">
            <Image className="w-5 h-5" />
          </button>
          <button className="p-3 text-dark-400 hover:text-dark-300 transition-colors rounded-xl hover:bg-dark-800/50">
            <Mic className="w-5 h-5" />
          </button>
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Escribe tu mensaje..."
            className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-dark-50 placeholder-dark-500"
          />
          
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="p-3 rounded-xl gradient-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-glow transition-all duration-300"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
