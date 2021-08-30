import { INotification } from '@/types/c-notification';

const success = {
  message: {
    type: 'success',
    message: 'This is an example success message.',
  },
  id: 4,
  expire: true,
  title: '',
};

const info = {
  message: {
    type: 'info',
    message: 'This is an example info message.',
  },
  id: 4,
  expire: true,
  title: '',
};

const warning = {
  message: {
    type: 'warning',
    message: 'This is an example warning message.',
  },
  id: 4,
  expire: true,
  title: '',
};

const error = {
  message: {
    type: 'error',
    message: 'This is an example error message.',
  },
  id: 4,
  expire: true,
  title: '',
};

const confirmationMessage: INotification = {
  message: {
    type: 'warning',
    message: 'Please decline this message.',
  },
  id: 1,
  expire: false,
  title: 'A title',
  confirm: ({ notification, resolve }: { notification: INotification, resolve?: (value: any) => void}) => {
    // eslint-disable-next-line no-console
    console.info(`Notification ${notification.id} was confirmed.`);

    if (resolve) {
      setTimeout(resolve, 2000);
    }
  },
  decline: ({ notification, resolve }: { notification: INotification, resolve?: (value: any) => void}) => {
    // eslint-disable-next-line no-console
    console.info(`Notification ${notification.id} was declined.`);

    if (resolve) {
      setTimeout(resolve, 2000);
    }
  },
};

const fieldError = {
  data: {},
  messages: [{
    type: 'error',
    code: '123',
    source: { field: 'first-name' },
    message: 'Value is too short',
  }],
};

const selectorInfo1 = {
  data: {},
  messages: [{
    type: 'info',
    source: {
      selector: '1',
    },
    message: 'Not available anymore',
  }],
};

/**
 * Returns a message in a response JSON format.
 */
function messageAsResponse(message: INotification) {
  return {
    data: {},
    messages: [message.message],
  };
}

export default {
  list: [
    success,
    info,
    warning,
    error,
    confirmationMessage,
  ],
  success: messageAsResponse(success),
  info: messageAsResponse(info),
  warning: messageAsResponse(warning),
  error: messageAsResponse(error),
  confirmationMessage: messageAsResponse(confirmationMessage),
  fieldError,
  selectorInfo1,
};
