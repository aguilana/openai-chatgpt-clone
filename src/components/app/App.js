import axios from "axios";
import React, { useState, useEffect } from "react";
import ChatMessage from "../chatlog/ChatMessage";
import "./app.css";
import "./normal.css";

const App = () => {
  // useEffect run once when app loads
  useEffect(() => {
    getEngines();
  }, []);

  // state for models
  const [models, setModels] = useState([])
  const [currentModel, setCurrentModel] = useState("")
  // add state for input and chatlog
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    { user: "gpt", message: "How can I help you today?" },
    { user: "me", message: "I want to use ChatGPT today" },
  ]);

  console.log("MODELS DATA, ", models)
  console.log("CURRENT MODEL", currentModel)
  console.log("CHATLOG", chatLog);

  // clear chats
  function clearChat() {
    setChatLog([]);
  }

  async function getEngines() {
    try {
      const { data } = await axios.get("/models");
      console.log("DATA FROM ENGINES", data.models);
      setModels(data.models)
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setChatLog(chatLogNew);
    setInput("");

    // fetch request to API
    const messages = chatLogNew.map((message) => message.message).join("\n");
    try {
      const { data } = await axios.post("/", {
        message: messages,
        currentModel,
      });
      console.log("RESPONSE DATA FROM API CALL", data);
      console.log("RESPONSE DATA FROM API CALL - the message!", data.message);
      setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="app">
      <aside className="sidemenu">
        <div className="sidemenu-button" onClick={clearChat}>
          <span> + </span>
          New Chat
        </div>
        <div className="models">
          <select onChange={(e)=>setCurrentModel(e.target.value)}>
            {models.map((model, idx) => (
              <option key={idx} value={model.id}>{model.id}</option>
            ))}
          </select>
        </div>
      </aside>
      <section className="chatbox">
        <div className="chatbox-chatlog">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              className="chat-input-textarea"
              placeholder="Type your message here"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></input>
          </form>
        </div>
      </section>
    </div>
  );
};

export default App;
