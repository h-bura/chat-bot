import { useEffect, useRef, useState } from "react";
import "./App.css";
function App() {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatboxRef = useRef(null);
  const scrollToBottom = () => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom(); 
  }, [messages]);


  const handleChat =async () => {

    const userMessage = { text: inputMessage, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage])
    const botResponse =await generateResponse(inputMessage);
    setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: 'bot' }]);
    setInputMessage('');
  };

    const generateResponse=async (userMessage)=>{
      const API_KEY=process.env.REACT_APP_API_KEY
      const API_URL="https://api.openai.com/v1/chat/completions";
      const requestOptions={
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authorization":`Bearer ${API_KEY}`
        },
        body:JSON.stringify({
          "model": "gpt-3.5-turbo",
      "messages": [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": userMessage
        }
      ]
        })
      }
      setMessages((prevMessages) => [...prevMessages, { text: "Thinking...", sender: 'bot' }]);

      try {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    await sleep(600);
        const response = await fetch(API_URL, requestOptions);
        const data = await response.json();
        console.log(data);
        setMessages((prevMessages) => prevMessages.slice(0, -1))
        return data.choices[0].message.content;

      } catch (error) {
        console.log(error);
        setMessages((prevMessages) => prevMessages.slice(0, -1))
        return "An error occurred...";
      }
    }  

  return (
    <div className="chatbot">
      <header className="header">
        <h2>Chatbot</h2>
      </header>
      <ul className="chatbox" ref={chatboxRef}>
        {messages.map((message, i) => (
          <li className={`chat ${message.sender === 'user' ? 'outgoing' : 'incoming'}`} key={i}>
            {message.sender === 'bot' && (
              <span className="material-symbols-outlined">smart_toy</span>
            )}
            <p>{message.text}</p>
          </li>
        ))}
      </ul>
      <div className="chat-input">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Enter a message..."
          required
        ></textarea>
        <span onClick={handleChat} id="send-btn" className="material-symbols-outlined">
          send
        </span>
      </div>
    </div>
  );
}

export default App;