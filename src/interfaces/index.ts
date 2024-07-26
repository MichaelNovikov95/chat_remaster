export interface IMessages {
  message: string;
  user: User;
}

export type User = string;
export type Room = string;

//Props interfaces

export interface IHeader {
  id: string;
  choosenRoom: string;
}

export interface IRooms {
  toGeneral: () => void;
  choosenRoom: string;
  rooms: Array<string>;
  chooseRoom: (room: string) => void;
}

export interface IUsers {
  onlineUsers: string[];
}

interface IFormModel {
  message: string;
  room: string;
}

export interface IForms {
  sendMessage: (payload: Event) => void;
  createRoom: (payload: Event) => void;
  modelValue: IFormModel;
}

export interface IForm {
  submitFunction: (payload: Event) => void;
  title: string;
  modelValue: string;
}

export interface IPropsMessages {
  messages: IMessages[];
}
