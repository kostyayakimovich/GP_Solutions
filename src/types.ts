export enum NewsModalType {
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete',
}

export enum LoginModalType {
  Create = 'create',
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
export type CurrentCurrency = {
  Cur_Abbreviation: string;
  Cur_ID: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
  Cur_Scale: number;
  Date: string;
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
