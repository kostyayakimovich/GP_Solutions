export enum ModalType {
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete',
}

export enum RegisterType {
  Login = 'login',
  Signin = 'signin',
}

export type Action = {
  type: string;
  payload: any;
};

export type CurrentNews = {
  id: string;
  title: string;
  body: string;
  dateCreate: string;
  author: string;
};

export type Payload = {
  id?: string;
  dateCreate?: string;
  title: string;
  body: string;
  author: string;
};

export type Person = {
  login: string;
  email: string;
  password: string;
};
