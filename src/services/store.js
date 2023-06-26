import { createData, env } from "brace-jsx";
import { getLocalStorage, setLocalStorage } from "brace-jsx/browser"
import { Core, Http } from "utiliti-js";

const isDev = env() === "development";
const { Store } = Core;

const http = new Http();
const username = "admin@uref.me";
const password = "xyz65doxxing";
const host = isDev
  ? "http://localhost:8000/api"
  : "https://port-api.onrender.com/api";
const data = createData({
  authenticated: false,
  projects: [],
  messages: [],
  currentProject: null,
  currentMessage: null,
  projectData: {},
  completed: false,
  storeStatus: {
    error: false,
    message: "",
  },
});

const silent = { silent: true };
const ls = getLocalStorage("xyz-adm-apex") || null;

if (ls) {
  const { authenticated } = ls;

  if (authenticated) {
    data.mutate({ authenticated: true }, silent);
  }
}

const reducer = (state, action) => {
  const { type, value } = action;

  if (type === "authenticate") {
    if (value.password === password && value.username === username) {
      fetchDataFromServer();
      state.mutate({ authenticated: true }, silent);
      setLocalStorage({ authenticated: true });
    }
  }
  if (type === "de-authenticate") {
    state.mutate({ authenticated: false }, silent);
    setLocalStorage({ authenticated: true });
  }
  if (type === "content-loaded") {
    state.mutate({ completed: true });
  }
  if (type === "need-project") {
    const { id } = value;

    if (!state.value.currentProject) {
      fetchDataFromServer();
    }

    const currentProject = state.value.projects.find(({ _id }) => _id === id);

    state.mutate({ currentProject });
  }
  if (type === "need-message") {
    const { id } = value;

    if (!state.value.currentMessage) {
      fetchDataFromServer();
    }

    const currentMessage = state.value.messages.find(({ _id }) => _id === id);

    state.mutate({ currentMessage });
  }
  if (type === "delete-project") {
    const { _id } = value;

    if (!state.value.currentProject) {
      return state;
    }

    http.delete(`${host}/projects/${_id}`);

    fetchDataFromServer();
    state.mutate({ currentProject: null });
  }
  if (type === "delete-message") {
    const { _id } = value;

    if (!state.value.currentMessage) {
      return state;
    }

    http.delete(`${host}/contact/${_id}`)

    fetchDataFromServer();
    state.mutate({ currentMessage: null });
  }
  if (type === "new-project") {
    http
      .post(`${host}/projects`, value.data)
      .then((response) => {
        const r = response.json();
        return r;
      })
      .then((res) =>
        state.update((p) => ({
          ...p,
          projects: [
            {
              ...res,
              img_url: res.img_url.includes("http")
                ? res.img_url
                : `${host}${res.img_url}`,
            },
            ...p.projects,
          ],
        }))
      );
  }
  if (type === "set-error") {
    state.mutate({ storeStatus: { error: true, message: value.message } });
  }
  if (type === "clear-error") {
    state.mutate({ storeStatus: { error: false, message: "" } });
  }

  return state;
};

function fetchMessages() {
  return http.get(`${host}/contact`);
}
function fetchProjects() {
  return http.get(`${host}/projects`);
}

async function fetchDataFromServer() {
  const [messagesResponse, postsResponse] = await Promise.all([
    fetchMessages(),
    fetchProjects(),
  ]);

  const messagesResult = await messagesResponse.json();
  const postsResult = await postsResponse.json();

  data.update((prevState) => ({
    ...prevState,
    messages: messagesResult.contacts.reverse() || [],
    projects: postsResult.posts || [],
  }));

  inStore.dispatch({ type: "content-loaded" });
}

const blockLocalhostOnProduction = async (request, next) => {
  const abortController = new AbortController();
  const { signal } = abortController;
  request.signal = signal;
  if (!isDev && request.url.includes("localhost")) {
    abortController.abort();
  }
  return request;
};

const errorHandlingInterceptor = async (request, next) => {
  try {
    // pass the request to the next interceptor
    const response = await next(request);
    if (!response.ok) {
      inStore.dispatch({
        type: "set-error",
        value: { message: "Failed to fetch" },
      });
      inStore.dispatch({ type: "content-loaded" });
    }
  } catch (error) {
    inStore.dispatch({ type: "set-error", value: { message: error.message } });
    inStore.dispatch({ type: "content-loaded" });
  }
  // always return the request
  return request;
};

// Use interceptors
http.useInterceptors([blockLocalhostOnProduction, errorHandlingInterceptor]);

(async () => {
  if (!data.value.authenticated) {
    return;
  }

  await fetchDataFromServer();
})();

export const inStore = new Store(reducer, data);
