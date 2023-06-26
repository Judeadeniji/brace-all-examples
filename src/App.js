import { signal, effect } from "brace-jsx";
import LoginForm from "./components/login"

export default function App() {
  const [count, setCount] = signal(0);
  effect(() => {
   const id = setInterval(function() {
    setCount(c => c + 1)
   }, 999);
   return () => clearInterval(id);
  }, [count]);
  console.log(count)
  return (
  <Div class="bg-white flex flex-col items-center justify-center h-screen
  overflow-y-hidden m-0 px-4">
  <h1 class="text-4xl text-center mb-3 font-bold leading-tight">
    Welcome Back {count}
  </h1>
   <LoginForm />
  </Div>
  )
}

function Div({ children, ...props }) {
  return (
      <div {...props} key="app">{children}</div>
    )
}