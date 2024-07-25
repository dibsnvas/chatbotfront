import { useState } from "react";
import axios from "axios";
import { SlReload } from "react-icons/sl";

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;
};

function Title({ setMessages }: Props) {
  const [isResetting, setIsResetting] = useState(false);

  const resetConversation = async () => {
    setIsResetting(true);

    try {
      const res = await axios.get("http://127.0.0.1:8000/reset", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setMessages([]);
      }
    } catch (err) {
      console.error("Error resetting conversation:", err);
    }

    setIsResetting(false);
  };

  return (
    <div className="flex justify-between items-center w-full p-6 bg-customBlue text-customPink font-bold shadow text-2xl">
      <div className="flex-1 text-center text-white">Shyraq</div>
      <button
        onClick={resetConversation}
        className={
          "transition-all duration-300" +
          (isResetting ? " animate-pulse" : "")
        }
      >
        <SlReload />
      </button>
    </div>
  );
}

export default Title;
