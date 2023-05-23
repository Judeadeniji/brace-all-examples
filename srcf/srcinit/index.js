import './index.css'
import { Mount } from 'brace-jsx';
import { createRouter, RouteOutlet, navigate } from 'brace-router';
import App from "./App"

function ParentComponent({children}) {
  return (
    <>
      <h1>Parent Component</h1>
        {children}
    </>
  );
}

function ChildComponentOne() {
  return <p>This is Child Component One</p>;
}

function ChildComponentTwo() {
  return <p>This is Child Component Two</p>;
}

function ChildComponentThree() {
  return <p>This is Child Component Three</p>;
}

function ChildComponentFour() {
  return (<>
     <ChildComponentThree />
    <p>This is Child Component Four</p>
    </>
    );
}

const routes = [
    {
      path: '/',
      component: (params) => {
        console.log(params)
        return <App />
      }
    },
    {
      path: '/home',
      component: (params) => {
        console.log(params)
        return <ParentComponent />
      }
    },
  ]



createRouter(routes);
 
Mount(<RouteOutlet />, document.querySelector("#root"))
setTimeout(() => navigate("home"), 4000)
setTimeout(() => navigate("/"), 8000)