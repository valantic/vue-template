import { createStore } from 'vuex';
import getUrlParameter from '@/helpers/get-url-parameter';

const data = window.initialData || {};
const requireModule = require.context('./modules/', true, /index\.js/);
const modules = {};
let initialDataMessages = [];

requireModule.keys().forEach((fileName) => {
  const moduleName = fileName.replace(/(\.\/|\/index\.js)/g, '').replace(/-([a-z])/g, group => group[1].toUpperCase());

  modules[moduleName] = requireModule(fileName).default;
});

const store = createStore({
  modules
});

// Set initial data
Object.keys(data).forEach((action) => {
  const { messages } = data[action] || {};

  // NOTE: We moved away from JSON again, since it was too picky about special characters in the to be parsed string.
  store.dispatch(action, data[action]);

  if (Array.isArray(messages)) {
    initialDataMessages = initialDataMessages.concat(messages);
  }
});

if (initialDataMessages.length) {
  setTimeout(() => { // Make sure all general imports did run before.
    initialDataMessages.forEach((message) => {
      store.commit('notification/pushNotification', { message });
    });
  });
}

// Set theme according to url in development. e.g. ?theme=01
if (process.env.NODE_ENV !== 'production') {
  const themeId = getUrlParameter('theme');

  if (themeId) {
    store.commit('session/setTheme', themeId);
  }
}

window.initialData = {};

export default store;
