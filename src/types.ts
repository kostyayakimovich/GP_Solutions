export enum ModalType {
  Add = 'add',
  Edit = 'edit',
  Delete = 'delete',
}

export type Action = {
  type: string;
  payload: any;
};

export type CurrentNews = {
  id: string;
  title: string;
  body: string;
};

export type Payload = { id?: string; title: string; body: string };
