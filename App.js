import React, { useState, useEffect } from 'react';
import { Plus, Volume2 } from 'lucide-react';

const App = () => {
  const [words, setWords] = useState([]);
  const [englishWord, setEnglishWord] = useState('');
  const [romanianWord, setRomanianWord] = useState('');

  useEffect(() => {
    const savedWords = localStorage.getItem('words');
    if (savedWords) {
      setWords(JSON.parse(savedWords));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('words', JSON.stringify(words));
  }, [words]);

  const addWord = (e) => {
    e.preventDefault();
    if (englishWord && romanianWord) {
      setWords([...words, { english: englishWord, romanian: romanianWord }]);
      setEnglishWord('');
      setRomanianWord('');
    }
  };

  const speakWord = (word, lang) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = lang === 'english' ? 'en-US' : 'ro-RO';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">English Learning Tool</h1>
          <form onSubmit={addWord} className="mb-6">
            <div className="flex space-x-4">
              <input
                type="text"
                value={englishWord}
                onChange={(e) => setEnglishWord(e.target.value)}
                placeholder="English word"
                className="flex-1 p-2 border rounded"
              />
              <input
                type="text"
                value={romanianWord}
                onChange={(e) => setRomanianWord(e.target.value)}
                placeholder="Romanian word"
                className="flex-1 p-2 border rounded"
              />
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                <Plus size={24} />
              </button>
            </div>
          </form>
          <div className="space-y-4">
            {words.map((word, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded">
                <div>
                  <span className="font-semibold">{word.english}</span>
                  <span className="mx-2">-</span>
                  <span>{word.romanian}</span>
                </div>
                <div className="space-x-2">
                  <button onClick={() => speakWord(word.english, 'english')} className="text-blue-500 hover:text-blue-600">
                    <Volume2 size={20} />
                  </button>
                  <button onClick={() => speakWord(word.romanian, 'romanian')} className="text-purple-500 hover:text-purple-600">
                    <Volume2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
