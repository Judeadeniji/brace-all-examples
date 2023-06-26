import { RouteOutlet, Status } from "brace-jsx/router";
import { createData } from "brace-jsx";
import { inStore } from "./services/store";
import { Header, BottomBar } from "./partials/nav";

const showHeader = createData(true);
const showFooter = createData(true);
const showLoader = createData(true);
const showErrorModal = createData({
  show: false,
  message: ''
});

Status.subscribe(({ statusCode, response }) => {
  if (
    response.pathname == ("/login")
    ||
    [404, 600, 604].includes(statusCode) 
  ) {
    showHeader.set(false);
    showFooter.set(false);
  } else if (response.pathname.startsWith("/edit")) {
    showFooter.set(false);
    showHeader.set(true);
    return;
  } else {
    showFooter.set(true);
    showHeader.set(true);
  }
});

const unsubscribe = inStore.subscribe(({ value }) => {
  if (value.completed) {
    setTimeout(function () {
      showLoader.set(false);
      unsubscribe();
    }, 100);
  };
  if (value.storeStatus.error) {
    showErrorModal.set({
      show: true,
      message: value.storeStatus.message.includes('fetch') ? 'Network Error' : value.storeStatus.message
    })
  }
});

if (location.pathname.includes("edit")) {
  setTimeout(function() {
    showLoader.set(false)
  }, 1000);
}


function Loader() {
  return (
    <div
      class="flex justify-center items-center min-h-screen w-full bg-white dark:bg-[#171717]"
      key="Loader"
    >
      <div class="loader-spinner w-[50px] h-[50px] rounded-full border-[4px] border-transparent border-t-black dark:border-t-white"></div>
    </div>
  );
}

function ErrorModal({ message }) {
  return (
    <div key="ErrorModal" class="error-container p-0 fixed top-0 right-0 left-0 bottom-0 z-50">
      <div class="error-modal mb-9 w-[90%] h-[200px]">
         <p class="font-extrabold text-[18px] text-[red] text-opacity-80 text-center">
            An Error Occured
         </p>
        <div class="flex mt-1 flex-col justify-evenly items-center mx-auto">
          <p class="mt-2 mb-2 w-[100%] p-1 font-medium text-center">
            Could not Complete Action Currently, Please Reload.
          <span class="block w-[100%] p-1 font-normal text-[12px] text-slate-600 text-center">{message}</span>
          </p>
          <button class="w-full self-baseline mb-1 py-2 border bg-[#2f8ef1]
          active:scale-90
          font-bold text-white border-[#2f8ef1] rounded-full" click$={() =>
          showErrorModal.set({
            show: false,
            message: ''
          })}>
              Dismiss
          </button>
        </div>
      </div>
   </div>
 )
}

function App() {
  const showLoaderValue = showLoader.value;
  const authenticatedValue = inStore.getState().value.authenticated;

  if (showLoaderValue && authenticatedValue) {
    return <Loader />;
  } else {
    return (
      <div class="h-full w-full max-w-[720px] p-0 mx-auto dark:bg-[#171717] pb-[50px]">
        {showHeader.value ? <Header /> : <comment />}
        {showErrorModal.value.show ? <ErrorModal
        message={showErrorModal.value.message} /> : <comment /> }
        <RouteOutlet />
        {showFooter.value ? <BottomBar /> : <comment />}
      </div>
    );
  }
}

export default App;
