import { useState, useRef, useEffect } from 'react';
import { Send, MapPin, Minimize2, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIConcierge() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Moni (Greetings). I am Mphatso, your personal host at Tranquil Waters Lodge. I am here to help paint a picture of our contemporary sanctuary, customize your itineraries on Lake Malawi, or plan transfers through the wild woods. What is your heart seeking today?'
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested luxurious questions
  const SUGGESTED_PROMPTS = [
    { text: 'Planning a 4-night itinerary...', label: 'Itinerary idea' },
    { text: 'How are you solar-powered?', label: 'Solar & Community' },
    { text: 'What is the dhow sailing experience?', label: 'Dhow sailing' },
    { text: 'How do we reach you from Lilongwe?', label: 'Travel transfers' }
  ];

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setErrorMessage('');
    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      role: 'user',
      content: textToSend
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const chatPayload = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: chatPayload })
      });

      if (!res.ok) {
        throw new Error('Our connection is briefly disrupted. Please try shortly.');
      }

      const data = await res.json();
      
      const assistantMessage: ChatMessage = {
        id: Math.random().toString(),
        role: 'assistant',
        content: data.text || 'Our host is silently reflecting. Please ask your question again.'
      };

      setMessages((prev) => [...prev, assistantMessage]);

    } catch (err: any) {
      console.error("Concierge communication error:", err);
      setErrorMessage(err.message || "Apologies. The quiet of the lake has temporarily delayed the network.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestClick = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: 'Moni. I am Mphatso. Let us design your peaceful lakeside days and golden reserve safaris anew. What would you like to explore today?'
      }
    ]);
    setErrorMessage('');
  };

  return (
    <div className="bg-earth-100/60 border border-earth-200 rounded-xl p-5 md:p-6" id="ai-concierge-console">
      <div className="flex items-center justify-between border-b border-earth-200 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-earth-600 rounded-full animate-pulse" />
          <h3 className="font-serif text-lg text-charcoal-900 flex items-center gap-1.5 font-medium">
            Mphatso &mdash; Your Digital Host
            <Sparkles size={14} className="text-earth-600" />
          </h3>
        </div>
        <button
          onClick={clearChat}
          className="text-[10px] uppercase tracking-wider text-earth-700 hover:text-earth-900 border border-earth-300 rounded px-2 py-0.5 pointer-events-auto cursor-pointer"
        >
          Reset Consultation
        </button>
      </div>

      {/* Messages container */}
      <div
        ref={scrollRef}
        className="h-80 overflow-y-auto pr-2 space-y-4 mb-4 font-light text-sm"
        id="concierge-messages"
      >
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col max-w-[85%] ${
              m.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wide text-earth-700 mb-1 px-1">
              {m.role === 'user' ? 'Guest' : 'Butler Mphatso'}
            </span>
            <div
              className={`p-3.5 rounded-lg leading-relaxed ${
                m.role === 'user'
                  ? 'bg-earth-800 text-white rounded-br-none'
                  : 'bg-white border border-earth-100 text-charcoal-900 rounded-bl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex flex-col items-start mr-auto max-w-[85%]">
            <span className="text-[10px] uppercase tracking-wide text-earth-700 mb-1">
              Mphatso
            </span>
            <div className="bg-white border border-earth-100 p-4 rounded-lg rounded-bl-none shadow-sm text-xs italic text-earth-600 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-earth-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-earth-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-earth-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              <span>Drafting sensory counsel...</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-2">
            <AlertCircle size={14} />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Suggested prompts chips */}
      <div className="mb-4">
        <span className="block text-[10px] uppercase tracking-wider text-earth-700 font-medium mb-2">
          Consult on:
        </span>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSuggestClick(p.text)}
              className="text-xs bg-white border border-earth-200 text-earth-800 px-3 py-1.5 rounded-full hover:border-earth-600 hover:text-earth-900 transition-colors pointer-events-auto cursor-pointer font-light"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(input);
        }}
        className="flex gap-2"
        id="concierge-input-form"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Mphatso about safaris, rooms, or travel requirements..."
          disabled={isLoading}
          className="flex-1 bg-white border border-earth-200 rounded px-4 py-3 text-sm focus:border-earth-600 focus:outline-none text-charcoal-900 font-light placeholder-earth-600/60"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="bg-earth-800 hover:bg-earth-900 text-white p-3 rounded transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          id="btn-send-message"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
