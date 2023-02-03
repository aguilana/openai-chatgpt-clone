import React from "react";
import "./app.css";
import "./normal.css";

// console.log("PROCESS ENV", process.env.REACT_APP_OPENAI_SECRET)

const App = () => {
  return (
    <div className="app">
      <aside className="sidemenu">
        <div className="sidemenu-button">
          <span> + </span>
          New Chat
        </div>
      </aside>
      <section className="chatbox">
        <div className="chatbox-chatlog">
          <div className="chatbox-chatlog-chatmsg">
            <div className="chatbox-chatlog-chatmsg-center">
              <div className="avatar"></div>
              <div className="message">Hello World</div>
            </div>
          </div>
          <div className="chatbox-chatlog-chatmsg chatgpt">
            <div className="chatbox-chatlog-chatmsg-center">
              <div className="avatar chatgpt"></div>
              <div className="message"> I am an AI Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur repellat voluptate commodi atque aperiam illum delectus quia harum molestiae provident, nemo exercitationem expedita optio nihil, ipsam repudiandae, aliquid nostrum magni?
              Obcaecati, repellendus tempora? Reprehenderit, praesentium. Eligendi quidem porro aspernatur sit facilis qui, doloribus error incidunt itaque fuga iste corporis nemo nihil eos quo commodi accusantium expedita architecto ipsa maxime minima!
              Laboriosam sapiente nostrum adipisci tempora, modi odio repellendus iusto debitis molestiae natus, velit accusamus dolores, praesentium quis. Esse tempore, ex tenetur, ducimus, suscipit ut non cupiditate fugit error molestias aperiam?</div>
            </div>
          </div>
        </div>
        <div className="chat-input-holder">
          <textarea
            className="chat-input-textarea"
            placeholder="Type your message here"
            rows="1"
          ></textarea>
        </div>
      </section>
    </div>
  );
};

export default App;
