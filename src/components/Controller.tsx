import React, { useState } from "react";
import axios from "axios";
import Title from "./Title";

const Controller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");

  const suggestions = [
    "Поиграем в города",
    "Расскажи анекдот",
    "Расскажи сказку",
    "Какие исторические факты ты знаешь?",
  ];

  const handleTextSubmit = async (text) => {
    if (!text.trim()) return;

    const myMessage = { sender: "me", text: text.trim() };
    const messagesArr = [...messages, myMessage];

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://chattext-back.onrender.com/post-text/",
        new URLSearchParams({ text: text.trim() }),
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
      );
      

      const almaMessage = { sender: "alma", text: response.data.response };
      setMessages([...messagesArr, almaMessage]);
      setTextInput("");
    } catch (err) {
      console.error("Error handling text submit:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleTextSubmit(suggestion);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleTextSubmit(textInput);
    }
  };

  return (
    <div className="h-screen overflow-y-hidden bg-white">
      <Title setMessages={setMessages} />

      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        <div className="mt-5 px-5">
          {messages.length === 0 && !isLoading && (
            <div className="text-center font-light mt-10">
              <p>Запиши сообщение...</p>
              <div className="mt-4 flex flex-col items-center">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-black italic mb-2 bg-customPink p-2 rounded w-3/4"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="text-center font-light italic mt-10 animate-pulse">
              Дай мне подумать...
            </div>
          )}

          {messages?.map((message, index) => (
            <div
              key={index + message.sender}
              className={
                "flex flex-col " +
                (message.sender === "alma" ? "flex items-end" : "")
              }
            >
              <div className="mt-4">
                <p
                  className={
                    message.sender === "me"
                      ? "text-right mr-2 italic text-black"
                      : "ml-2 text-blue-500"
                  }
                >
                  {message.sender}
                </p>
                <p className="text-black">{message.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r bg-customBlue">
          <div className="flex justify-center items-center w-full mt-4">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border rounded p-2 flex-grow mx-4"
              placeholder="Напишите сообщение..."
            />
            <button
              onClick={() => handleTextSubmit(textInput)}
              className="bg-customPink text-black p-2 rounded ml-2"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controller;
