import React, { useState } from "react";
import axios from "axios";
import Title from "./Title";

const Controller = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState("");

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
    } catch (error) {
      console.error("Error handling text submit:", error);

      // Enhanced Error Handling
      let errorMessage = "An error occurred. Please try again.";
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = "The message format is incorrect. Please try again.";
            break;
          case 404:
            errorMessage = "Backend API not found. Check the URL.";
            break;
          case 500:
            errorMessage = "Internal Server Error. Please try again later.";
            break;
          case 503: 
            errorMessage = "ChatGPT service unavailable or OpenAI API error. Please try again later.";
            break;
          // Add more cases for other specific status codes if needed
        }
      } else if (error.request) {
        errorMessage = "No response received from the server.";
      }

      setMessages([
        ...messagesArr,
        { sender: "error", text: errorMessage }
      ]);
    } finally {
      setIsLoading(false);
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
              className="border rounded p-2"
              placeholder="Напишите сообщение..."
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