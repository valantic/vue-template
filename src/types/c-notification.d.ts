interface IMeta {
  id: string;
  confirmationType: string;
}

interface IMessage {
  type: string;
  message: string;
  meta: IMeta;
}

export interface INotification {
  message: IMessage;
  selector: string;
  id: string;
  expire: boolean;
  title: string;
  confirm: () => void;
  decline: () => void;
}
