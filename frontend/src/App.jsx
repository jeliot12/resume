import './App.css'
import { useState } from 'react';
import { Mic } from 'lucide-react';

function App() {
  const [formData, setFormData] = useState({ ask: ''})
  const [response, setResponse] = useState(null)
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const res = await fetch('http://localhost:3001/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      const respone = await res.json()
      setResponse(respone)
    } catch (error) {
      setResponse({ error: 'Ошибка соединения с сервером' })
    }
  }

  return (
    <div className="min-h-screen text-white p-6 md:p-12">
      <div className="w-12 h-12 bg-[#1E4187] rounded-xl flex items-center justify-center mb-8">
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>

      <div className="space-y-4 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold">
          Hi there!
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold">
          What would you like to know?
        </h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-md">
          Use one of the most common prompts below or ask your own question
        </p>
      </div>

      <form className="max-w-2xl" onSubmit={handleSubmit}>
        <div 
          className={`
            bg-[#1E4187] 
            rounded-2xl 
            p-4 
            flex 
            items-center 
            gap-4
            transition-all 
            duration-300
            ${isInputFocused ? 'ring-2 ring-blue-400' : ''}
          `}
        >
          <Mic className="w-6 h-6 text-gray-300" />
          <input
            type="text"
            placeholder="Ask whatever you want"
            value={formData.ask}
            onChange={(e) => setFormData({...formData, ask: e.target.value})}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className="
              flex-1 
              bg-transparent 
              outline-none 
              text-white 
              placeholder-gray-300
            "
          />
          <button
            type='submit'
            className="
              bg-blue-500 
              p-2 
              rounded-xl 
              hover:bg-blue-600 
              transition-colors
              duration-200
            "
          >
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </form>
      {response && (
        <div className={`mt-4 p-4 rounded max-w-4xl ${response.error ? 'bg-red-100' : 'bg-black'}`}>
          {response.error || response.message}
        </div>
      )}
    </div>
  );
}

export default App
