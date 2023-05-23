import LoginForm from "./components/login"
export default function App() {
  return (
  <Div class="bg-white flex flex-col items-center justify-center h-screen
  overflow-y-hidden m-0 px-4">
  <h1 class="text-4xl text-center mb-3 font-bold leading-tight">
  Welcome Back
  </h1>
   <LoginForm />
  </Div>
  )
}

function Div({ children, ...props }) {
  return (
      <div {...props}>{children}</div>
    )
}