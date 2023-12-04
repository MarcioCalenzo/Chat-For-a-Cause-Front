import { MessageWithChatProps } from "@/interfaces";
import { ImageManual } from "../imageManual/imageManual";

export const MessageWithChat: React.FC<MessageWithChatProps> = ({
  message,
  user,
}) => {
  return (
    <div>
      <div
        className={`chat ${
          message.idUser === user.id ? "chat-end" : "chat-start"
        }`}
      >
        <div className="chat-image avatar">
          <div className="w-10 ">
            <ImageManual name={message.name} />
          </div>
        </div>
        <div className="chat-header">{message.name}</div>
        <div className="chat-bubble">{message.text}</div>
      </div>
    </div>
  );
};
