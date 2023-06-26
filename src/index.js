import './index.css'
import { Mount, createData } from "brace-jsx"
import { useTitle } from "brace-jsx/browser"
import { createRouter, beforeRoute, onRoute, use404Component, History, navigate } from "brace-jsx/router"
import { inStore } from "./services/store"
import App from "./app"

const routes = [
  {
    path: '/login',
    component: () => import('./pages/auth'),
    guard: () => !inStore.getState().value.authenticated,
    resolve: (from) => navigate('/')
  },
  {
    path: '/',
    component: () => import(/* webpackPrefetch: true */'./pages/home'),
    guard: () => inStore.getState().value.authenticated,
    resolve: () => navigate('/login')
  },
  {
    path: '/projects',
    component: () => import('./pages/projects'),
    guard: () => inStore.getState().value.authenticated,
    resolve: () => navigate('/login'),
  },
  {
    path: '/projects/[id]',
    component: () => import('./pages/project-page'),
    guard: () => inStore.getState().value.authenticated,
    resolve: () => navigate('/login')
  },
  {
    path: '/message/[id]',
    component: () => import('./pages/message'),
    guard: () => inStore.getState().value.authenticated,
    resolve: () => navigate('/login')
  },
  {
    path: '/messages',
    component: () => import('./pages/messages'),
    guard: () => inStore.getState().value.authenticated,
    resolve: () => navigate('/login')
  },
  {
    path: '/settings',
    component: () => import('./pages/profile'),
    guard: () => inStore.getState().value.authenticated,
    resolve: () => navigate('/login')
  },
  {
    path: '/edit',
    component: () => import('./pages/editor'),
    guard: () => inStore.getState().value.authenticated,
    resolve: () => navigate('/login')
  },
  ];

onRoute(async ({ lastRoute,toRoute, params, pathname }) => {
  
    // Set the title based on the current route
  switch (pathname) {
    case '/login':
      useTitle('Login • My Admin Dashboard');
      break;
    case '/':
      useTitle('Home • My Admin Dashboard');
      break;
    case '/projects':
      useTitle('Projects • My Admin Dashboard');
      break;
    case '/messages':
      useTitle('Messages • My Admin Dashboard');
      break;
    case '/settings':
      useTitle('Settings • My Admin Dashboard');
      break;
    case '/edit':
      useTitle('Editor • My Admin Dashboard');
      break;
    default:
      useTitle(`My Admin Dashboard`);
      break;
  }
  
  // authentication was moved to onRoute from route array to simplify things
  // but using it will cause layout at flashing on initial load
  // as page will display due to asynchronous nature of this hook
  if (!inStore.getState().value.authenticated) {
    //navigate('/login');
   // return;
  }
  
  if (!lastRoute && toRoute.path.includes('/projects/[id]')) {
    await navigate("/projects");
    return;
  }
  if (toRoute.path.includes('/projects/[id]')) {
    inStore.dispatch({
      type: 'need-project',
      value: {
        id: params.id
      }
    })
  }
  if (toRoute.path.includes('/message/[id]')) {
    inStore.dispatch({
      type: 'need-message',
      value: {
        id: params.id
      }
    })
  }
});

beforeRoute(({ resolve, currentRoute }) => {
  // Create the loader element
  const loader = document.createElement('div');
  loader.classList.add('fixed', 'top-0', 'left-0', 'w-full', 'h-screen',
  'bg-white', 'bg-opacity-50', 'z-[999]');

  // Create the moving streak element
  const streak = document.createElement('div');
  streak.classList.add('absolute', 'top-0', 'left-0', 'w-[64px]', 'h-1', 'bg-primary');

  // Append the streak to the loader
  loader.appendChild(streak);

  // Append the loader to the document body
  document.body.appendChild(loader);

  // Set initial animation properties
  streak.style.animation = 'moveStreak 1.5s linear infinite';

  // Define keyframes for the animation
  const keyframes = `
    @keyframes moveStreak {
      0% {
        left: 0;
        width: 32px;
      }
      50% {
        left: calc(100% - 32px);
        right: calc(100% + 32px);
        width: 128px;
      }
      100% {
        left: 0;
        width: 32px;
      }
    }
  `;

  // Create a style element and add the keyframes
  const style = document.createElement('style');
  style.appendChild(document.createTextNode(keyframes));

  // Append the style element to the document head
  document.head.appendChild(style);

    setTimeout(() => {
     // Remove the loader after the specified duration
     resolve(() => document.body.removeChild(loader));
    }, 120);
});


use404Component(() => {
  return (
    <div key={{}} class="flex items-center justify-center bg-white h-screen
    w-full flex-col dark:bg-[#171717] text-gray-700 dark:text-[#ccc]">
      <div class="flex items-center py-2 w-full self-center ml-3">
        <h1 class="font-extrabold text-8xl">404</h1> | <p class="ml-2
        uppercase text-2xl">Page not found</p>
      </div>
      <a href="/" class="text-sm underline text-primary mt-2 mr-1"
      click$preventDefault$={History().goBack}>Go Back</a>
    </div>
    )
})

createRouter(routes);

Mount(() => <App />, document.querySelector("#root"));