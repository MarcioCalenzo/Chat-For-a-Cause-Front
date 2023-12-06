import { Header } from "@/components/header/header";
import { MessageWithChat } from "@/components/message/message";
import SendMessage from "@/components/sendMessage/sendMessage";
import { Message, User } from "@/interfaces";
import { api } from "@/services";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://18.230.192.164:3009");

const Dashboard = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const route = useRouter();
  const [user, setUser] = useState({} as User);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const checkIsLogged = async () => {
      try {
        const { data } = await api.get<User[]>("users/");
        const idUser = localStorage.getItem("chatforacause@id");
        const user: User | undefined = data.find((user) => user.id === idUser);
        if (user) {
          setUser(user);
        } else {
          route.push("/");
        }
      } catch (error) {
        route.push("/");
        console.error(error);
      }
    };
    checkIsLogged();

    function receivedMessage(message: Message) {
      setMessages([...messages, message]);
    }

    socket.on("msgToClient", (message: Message) => {
      receivedMessage(message);
    });
  }, [messages, user]);

  const scrollToBottom = () => {
    if (messagesEndRef.current != null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <main className="bg-grey8 w-screen h-screen ">
      <Header />
      <div className=" flex justify-end mr-10"></div>
      <div className="bg-grey6 h-96 bg-center overflow-auto mt-28 rounded-t-2xl container mx-auto max-w-4xl">
        <div>
          {messages.map((message) => (
            <MessageWithChat key={message.id} message={message} user={user} />
          ))}
        </div>
        <div ref={messagesEndRef}></div>
      </div>
      <SendMessage user={user} />
    </main>
  );
};

export default Dashboard;
