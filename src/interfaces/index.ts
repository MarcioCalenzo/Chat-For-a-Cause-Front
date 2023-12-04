export interface IButtonProps {
  type: "button" | "submit";
  className?: string;
  text?: string | any;
  children?: React.ReactNode;
  callback?: () => void;
  disable?: boolean;
}
export interface MessageWithChatProps {
  user: User;
  message: Message;
}

export interface ImageManualProps {
  name: string;
}

export interface SendMessageProps {
  user: User;
}

export interface IInputProps {
  labelName?: string;
  labelText?: string;
  placeholder: string;
  type: string;
  register?: any;
  disable?: boolean;
  value?: string;
  defaultValue?: string;
  classInput?: string;
  classLabel?: string;
}

export interface createModalProps {
  titleModal: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

export interface Message {
  id: string;
  name: string;
  text: string;
  idUser: string;
}

export interface Payload {
  name: string;
  text: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
}
