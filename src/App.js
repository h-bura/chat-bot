import { useState } from "react";
import "./App.css";

function App() {
  const [inputMessage,setInputMessage]=useState("")
  const [userMessages,setUserMessages]=useState([])
  const handleChat=()=>{
setUserMessages([...userMessages,inputMessage])
console.log(inputMessage,userMessages)
  }
  return (
    <div className="chatbot">
      <header className="header">
        <h2>Chatbot </h2>
      </header>
      <ul className="chatbox">
       <li className="chat incoming" >
          
          <span className="material-symbols-outlined">smart_toy</span>
          <p>
          hello 
          </p>
        </li>
        {userMessages.map((userMessage,i)=>
        <li className="chat outgoing" key={i}>
          <p>{userMessage}</p>
        </li>)}
      </ul>
      <div className="chat-input">
        <textarea onChange={(e)=>setInputMessage(e.target.value)} placeholder="Ender a message..." required></textarea>
        <span onClick={handleChat} id="send-btn" className="material-symbols-outlined">
          send
        </span>
      </div>
    </div>
  );
}

export default App;
