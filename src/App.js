import "./App.css";

function App() {
  return (
    <div className="chatbot">
      <header className="header">
        <h2>Chatbot </h2>
      </header>
      <ul className="chatbox">
        <li className="chat incoming">
          <span className="material-symbols-outlined">smart_toy</span>
          <p>
            Hi there <br />
            How can I help you today
          </p>
        </li>
        <li className="chat outgoing">
          <p>lorem ipsum jdsnk</p>
        </li>
      </ul>
      <div className="chat-input">
        <textarea placeholder="Ender a message..."></textarea>
        <span id="send-btn" className="material-symbols-outlined">
          send
        </span>
      </div>
    </div>
  );
}

export default App;
