import { createData, onMount, Suspense } from "brace-jsx";
import { navigate } from "brace-jsx/router";

let submitButton;
let buttonContainer;
const formState = createData({
  errors: {
    isEmpty: {
      message: 'This field is required.'
    },
    minLength: {
      message: 'This field must have a minimum length of 6 characters.'
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
    validated: false,
    errorType: "isEmpty"
  },
  isValid: false
});

const errorClass = "border border-red-400 focus:outline-2 outline-red-300"

const handleInputChange = ({ id, value }) => {
  let errorType = null;
  let isValid = true;

  if (id === 'username') {
    isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValid) {
      errorType = 'emailFormat';
    }
  } else if (value.length < 6 && id !== 'username') {
    isValid = false;
    errorType = 'minLength';
  }

  formState.update(prevState => ({
    ...prevState,
    [id]: {
      value: value.trim(),
      dirty: true,
      validated: isValid,
      errorType
    },
    isValid: prevState.password.validated && prevState.username.validated
  }), { silent: false });
};


const handleButton = (button) => {
 if(!submitButton) submitButton = button;
}

function handleButtonTrick() {
  let isValid = formState.value.isValid;
  if (!submitButton) {
    setTimeout(handleButtonTrick, 0);
    return;
  }
  
  const button = submitButton;
  
  if(isValid) {
    buttonContainer.removeEventListener("mousemove", moveButtonAway);
    buttonContainer.removeEventListener("mouseout", resetButtonPosition);
    
    // Touch events for mobile devices
    buttonContainer.removeEventListener("touchmove", moveButtonAway);
    buttonContainer.removeEventListener("touchend", resetButtonPosition);
  }
  
  if (!isValid && button && buttonContainer) {
    buttonContainer.addEventListener("mousemove", moveButtonAway);
    buttonContainer.addEventListener("mouseout", resetButtonPosition);
    
    // Touch events for mobile devices
    buttonContainer.addEventListener("touchmove", moveButtonAway);
    buttonContainer.addEventListener("touchend", resetButtonPosition);
  }
}

function resetButtonPosition() {
  const button = submitButton;
  button.style.transform = "";
}

function moveButtonAway(event) {
  const button = submitButton;
  const clientX = event.clientX || event.touches[0].clientX;
  const clientY = event.clientY || event.touches[0].clientY;
  const buttonRect = button.getBoundingClientRect();
  const buttonX = buttonRect.left + buttonRect.width / 2; // Button center X
  const buttonY = buttonRect.top + buttonRect.height / 2; // Button center Y

  const dx = clientX - buttonX;
  const dy = clientY - buttonY;

  // Calculate the distance between the button center and the touch/mouse position
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Calculate the maximum distance the button can move
  const maxDistance = 640;
  const dangerZone = 90;
  const returnThreshold = dangerZone + 12; // safe distance for button to return to position

  // Check if the distance is within the "danger zone" (20px) and move the button away
  if (distance < maxDistance - dangerZone) {
    const angle = Math.atan2(dy, dx);
    const buttonNewX = buttonX - Math.cos(angle) * dangerZone;
    const buttonNewY = buttonY - Math.sin(angle) * dangerZone;

    // Smoothly move the button to the new position
    button.style.transition = "transform 0.2s";
    button.style.transform = `translate(${buttonNewX - buttonX}px, ${buttonNewY - buttonY}px)`;
  } else if (distance > maxDistance - returnThreshold) {
    // Return the button to its initial position
    button.style.transition = "transform 0.1s";
    resetButtonPosition();
  } else {
    // Move the button to the opposite side if it's within the maximum distance
    const angle = Math.atan2(dy, dx);
    const buttonNewX = buttonX + Math.cos(angle) * maxDistance;
    const buttonNewY = buttonY + Math.sin(angle) * maxDistance;

    // Smoothly move the button to the new position
    button.style.transition = "transform 0.2s";
    button.style.transform = `translate(${buttonNewX - buttonX}px, ${buttonNewY - buttonY}px)`;
  }
}

function LoginForm() {
  const isValid = formState.value.isValid
  
  onMount(handleButtonTrick);
 
  const button = submitButton;
  
  if(formState.value.isValid) {
    buttonContainer.removeEventListener("mousemove", moveButtonAway);
    buttonContainer.removeEventListener("mouseout", resetButtonPosition);
    
    // Touch events for mobile devices
    buttonContainer.removeEventListener("touchmove", moveButtonAway);
    buttonContainer.removeEventListener("touchend", resetButtonPosition);
  } else {
    handleButtonTrick()
  }
  
  return ( 
  <form class="bg-white border rounded-2xl mx-auto px-4 pt-6 pb-8 mb-4 flex
  flex-col w-full max-w-sm relative" submit$preventDefault$={() =>
  {navigate("/dashboard/5")}}>
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
    <div class="flex items-center justify-between" bind:this={(el) => (buttonContainer = el)}>
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit" bind:this={handleButton}>
          Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue-500
      hover:text-blue-800" href="/forgot-password">
        Forgot Password?
      </a>
    </div>
  </form>
  )
}

async function FakeData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), 3000)
  });
}

export default LoginForm