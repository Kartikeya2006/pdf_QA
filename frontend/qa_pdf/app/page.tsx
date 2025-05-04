'use client'
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Logo from './_components/images/logo';
import ChatLogo from './_components/images/chat_logo';
import { useMediaQuery } from '@react-hook/media-query';
import UploadLogo from './_components/images/upload_logo';

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const [question, setQuestion] = useState('');
  const [filename, setFilename] = useState('');
  const [messages, setMessages] = useState<{ type: 'user' | 'ai'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isSmallScreen = useMediaQuery("(max-width : 550px)");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUpload = async () => {
    if (!file) return;
    
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    
    try {
      const res = await axios.post("http://ec2-16-16-121-111.eu-north-1.compute.amazonaws.com:8000/upload", formData);
      console.log("The response in the handleUpload : ", res);
      setFilename(res.data.filename);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setMessages([...messages, { type: 'user', content: question }]);
    
    setLoading(true);
    const formData = new FormData();
    formData.append("filename", filename);
    formData.append("question", question);
    
    try {
      const res = await axios.post("http://ec2-16-16-121-111.eu-north-1.compute.amazonaws.com:8000/ask", formData);
      setMessages(prev => [...prev, { type: 'ai', content: res.data.answer }]);
    } catch (error) {
      console.error("Error asking question:", error);
      setMessages(prev => [...prev, { type: 'ai', content: "Sorry, I encountered an error processing your question." }]);
    } finally {
      setLoading(false);
      setQuestion('');
    }
  };

  return (
    <main className="flex flex-col h-screen w-full mx-auto">

      <nav className="w-full flex h-[60px] bg-[rgb(239,243,239)] shadow-md justify-center fixed top-0 z-50">
        <div className='max-w-[1240px] w-full flex justify-between'>
          <div className="p-2">
              <Logo/>
          </div>
          <div className='flex gap-5 p-4 pb-4'>
            <div className="text-sm text-gray-700 p-2">
              {file ? file.name : "No file selected"}
            </div>
            <div>
              <label className="bg-green-300 flex p-2 rounded cursor-pointer rounded-b-lg shadow-md border-green-400 font-semibold border-1 hover:bg-green-400">
                {isSmallScreen && (
                  <div>
                    <UploadLogo/>
                  </div>
                )}
                {!isSmallScreen && (
                  <span className='text-sm md:text-md'>Upload PDF</span>
                )
                }
                <input
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const selectedFile = e.target.files?.[0] || null;
                    setFile(selectedFile);
                    if (selectedFile) {
                      setTimeout(handleUpload, 100);
                    }
                  }}
                />
              </label>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="flex flex-col h-screen pt-[60px] pb-[80px]">
        <div className="flex-1 overflow-y-auto w-full flex justify-center">
          <div className="w-full max-w-[1240px] p-4 space-y-4">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-700 mt-8">
                Upload a PDF and ask questions about it
              </div>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-[80%] ${msg.type === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                    {!(msg.type === 'user') && (
                      <div>
                        <ChatLogo/>
                      </div>
                    )}
                    {msg.type === 'user' && (
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white bg-purple-400 order-2 ml-2`}>
                        K
                      </div>
                    )}
                    <div className={`p-3 rounded-lg ${msg.type === 'user' ? 'bg-gray-100 order-1' : 'bg-white order-2 border border-gray-200'}`}>
                      <p><span className='text-gray-700 text-sm md:text-md '>{msg.content}</span></p>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center fixed bottom-0 z-50 bg-white shadow-md'>
        <div className="p-4 border-t w-full max-w-[1240px]">
          <form onSubmit={handleAsk} className="flex items-center">
            <input
              type="text"
              placeholder="Send a message..."
              className="flex-1 p-3 bg-gray-100 rounded-l-lg focus:outline-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              disabled={loading}
            />
            <button 
              type="submit" 
              className="bg-white p-3 rounded-r-lg border-l"
              disabled={loading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      </div>

    </main>
  );
}

export default Home;