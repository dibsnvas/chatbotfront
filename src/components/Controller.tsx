import React, { useState, useEffect } from "react";
import axios from "axios";
import Title from "./Title";

const Controller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");
  const [prompt, setPrompt] = useState("");

  const prompts = [
    "Напиши анекдот",
    "Напиши сказку",
    "Поиграем в города",
    "Поиграем в игру",
    "Напиши факт из истории"
  ];

  useEffect(() => {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setPrompt(randomPrompt);
  }, []);

  const handleTextSubmit = async () => {
    if (!textInput.trim()) return;

    const myMessage = { sender: "me", text: textInput.trim() };
    const messagesArr = [...messages, myMessage];

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://chattext-back.onrender.com/post-text/", 
        new URLSearchParams({ text: textInput.trim() }),
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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleTextSubmit();
    }
  };

  return (
    <div className="h-screen overflow-y-hidden bg-white">
      <Title setMessages={setMessages} />

      <div className="flex flex-col justify-between h-full overflow-y-scroll pb-96">
        <div className="mt-5 px-5">
          {messages?.map((message, index) => (
            <div
              key={index + message.sender}
              className={
                "flex " +
                (message.sender === "me" ? "justify-end" : "justify-start")
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
                  {message.sender === "me" ? "Я" : "alma"}
                </p>
                <p
                  className={
                    "p-2 rounded-lg " +
                    (message.sender === "me"
                      ? "bg-blue-100 text-right"
                      : "bg-gray-200 text-left")
                  }
                >
                  {message.text}
                </p>
              </div>
            </div>
          ))}

          {messages.length === 0 && !isLoading && (
            <div className="text-center font-light mt-10">
              Запиши сообщение...
            </div>
          )}

          {isLoading && (
            <div className="text-center font-light italic mt-10 animate-pulse">
              Дай мне подумать...
            </div>
          )}
        </div>

        <div className="fixed bottom-0 w-full py-6 border-t text-center bg-gradient-to-r bg-customBlue">
          <div className="flex justify-center items-center w-full mt-4">
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="border rounded p-2 flex-grow"
              placeholder={prompt}
            />
            <button
              onClick={handleTextSubmit}
              className="bg-customPink text-white p-2 rounded ml-2"
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
