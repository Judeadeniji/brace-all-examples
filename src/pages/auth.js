import { createData, onMount } from "brace-jsx";
import { navigate } from "brace-jsx/router";
import { inStore } from "../services/store";

const formState = createData({
  errors: {
    isEmpty: {
      message: 'This field is required.'
    },
    emailFormat: {
      message: 'Please enter a valid email address.'
    }
  },
  username: {
    value: '',
    dirty: false,
    validated: false,
    errorType: "isEmpty"
  },
  password: {
    value: '',
    dirty: false,
    errorType: "isEmpty"
  },
  isValid: false
});

const errorClass = "border border-red-400 focus:outline-2 outline-red-300";

const handleInputChange = ({ id, value }) => {
  let errorType = null;
  let isValid = true;

  if (id === 'username') {
    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      errorType = 'emailFormat';
    }
  }

  formState.update(prevState => ({
    ...prevState,
    [id]: {
      value: value.trim(),
      dirty: true,
      validated: isValid,
      errorType
    },
    isValid: prevState.username.validated
  }), { silent: false });
};

function handleSubmit () {
  const { isValid, username, password } = formState.value;
  if (isValid) {
    inStore.dispatch({
      type: 'authenticate',
      value: {
        username: username.value,
        password: password.value
      }
    });
    if (inStore.getState().value.authenticated) {
      navigate("/");
      return;
    } else alert("wrong details")
  }
}

function LoginForm() {
  const isValid = formState.value.isValid
  
  return ( 
  <form key="loginForm" class="bg-white border rounded-2xl mx-auto w-[96%] px-4 pt-6 pb-8 flex flex-col max-w-sm relative" submit$preventDefault$={handleSubmit}>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Username
      </label>
      <input
        class={`${!formState.value.username.validated &&
        formState.value.username.dirty ? errorClass : "focus:outline-2 outline-blue-400" } appearance-none border rounded w-full
        py-2 px-3 text-gray-700  leading-tight focus:shadow-outline`}
        id="username" type="text" placeholder="Username"
        bind:value={handleInputChange} aria-describedby="username-error" />
      {!formState.value.username.validated && formState.value.username.dirty ?
      (<p class="text-red-500 text-xs italic ml-1" id="username-error">{
      !formState.value.username.validated
      ? formState.value.errors[formState.value.username.errorType].message : ""
      }</p>) : <p />}
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Password
      </label>
      <input
        class={`${!formState.value.password.validated &&
        formState.value.password.dirty ? errorClass : "focus:outline-2 outline-blue-400" } appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:shadow-outline`}
        id="password" type="password" placeholder="Password"
        bind:value={handleInputChange} aria-describedby="password-error" />
      {!formState.value.password.validated && formState.value.password.dirty ?
      (<p class="text-red-500 text-xs italic ml-1" id="password-error">{
      !formState.value.password.validated
      ? formState.value.errors[formState.value.password.errorType].message : ""
      }</p>) : <p />}
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-purple-500 hover:bg-purple-600 transition-all text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-gray-700
      hover:underline" href="/forgot-password">
        Forgot Password?
      </a>
    </div>
  </form>
  )
}

function AuthLayout () {
 return (
   <div class="flex flex-col items-center justify-center h-screen">
   <h1 class="text-4xl mb-2 font-extrabold text-center inline-block">Welcome Back</h1>
    <LoginForm />
   </div>
   ) 
}

async function FakeData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 3000)
  });
}

export default AuthLayout