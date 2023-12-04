import { Message, SendMessageProps } from "@/interfaces";
import { useState } from "react";
import { io } from "socket.io-client";
import * as uuid from "uuid";

const SendMessage: React.FC<SendMessageProps> = ({ user }) => {
  const [text, setText] = useState("");

  const handleSendMessage = async (e: any) => {
    const authToken =
      typeof window !== "undefined"
        ? localStorage.getItem("chatforacause@token")
        : null;

    const socket = io("http://localhost:3009", {
      auth: {
        token: authToken,
      },
    });

    e.preventDefault();

    if (text.trim() === "") {
      return;
    }

    try {
      const newMessage: Message = {
        id: uuid.v4(),
        name: user.name,
        text: text,
        idUser: user.id,
      };

      socket.emit("messageServer", newMessage);
      setText("");
    } catch (error) {
      console.error(error);
    }
    setText("");
  };

  return (
    <div className="bg-grey6 rounded-b-2xl max-w-4xl mx-auto w-full py-10 shadow-lg">
      <form onSubmit={handleSendMessage} className="px-2 containerWrap flex">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="input w-full focus:outline-none bg-gray-100 rounded-r-none"
          type="text"
        />
        <button
          type="submit"
          className="btn w-auto ml-4 bg-gray-500 text-white rounded-r-lg px-5 text-sm"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
