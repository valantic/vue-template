interface IMeta {
  id: string;
  confirmationType: string;
  product: object;
}

interface ISource {
  selector: string;
  field: string;
}

interface IMessage {
  type: string;
  message: string;
  meta?: IMeta;
  source?: ISource;
}

export interface INotification {
  id?: number;
  message?: IMessage;
  title?: string;
  expire?: boolean;
  selector?: string;
  delay?: number;
  confirm?: boolean | ((parameters: {
    notification: INotification;
    resolve?: (value: unknown) => void;
    reject?: (value: unknown) => void;
    decline?: (value: unknown) => void;
   }) => void);
  decline?: (parameters: {
    notification: INotification;
    resolve?: (value: unknown) => void;
    reject?: (value: unknown) => void;
    decline?: (value: unknown) => void;
  }) => void;
}
