import { createData, onMount } from "brace-jsx"
import { Location, History, navigate, Status, Link } from "brace-jsx/router"
import House from "../assets/icons/house"
import UserGear, { User } from "../assets/icons/user"
import { Books } from "../assets/icons/books"
import { ChatCircle } from "../assets/icons/chat"
import { Menu1 } from "../assets/icons/menu"
import { ArrowRightBold } from "../assets/icons/arrows"
const root = document.querySelector("#root");
const { getCurrentPath } = Location();
const { goBack } = History();
const classActive = "text-primary";
const headerClass = createData("border-0");
const y = createData(0);
const lastY = createData(0);
let offset = 0;
let tolerance = 0;
let duration = 150;

function deriveClass(y, dy) {
  if (y === 0) return "";

  if (y < offset) {
    return "border-b fixed top-0 left-0  right-0";
  }

  if (Math.abs(dy) <= tolerance) {
    return headerClass;
  }

  if (dy < 0) {
    return "bg-opacity-80 z-50 backdrop-blur-sm border-b dark:border-b-[#666] fixed top-0 left-0 right-0";
  }
  
 
  return "border-b-0 bg-opacity-100";
}

function updateClass(y) {
  const dy = lastY - y;
  lastY = y;
  const dx = deriveClass(y, dy);
  return dx
}

function setTransitionDuration(node) {
  node.style.transitionDuration = duration;
}

function handleScroll() {
  const newY = window.scrollY;
  const dy = lastY.value - newY;
  y.set(newY, { silent: true });
  const dx = deriveClass(newY, dy);
  headerClass.set(dx);
}

async function changeRoute(to) {
 await navigate(to);
}

function GoBack() {
  return (
    <button key="GoBack" name="menu" arial-label="menu" class="bg-white dark:bg-[#151515]
    h-[40px] w-[40px] rounded-full p-2 border dark:border-[#666] spin-180" on:click={goBack}>
      <ArrowRightBold className="text-[#151515] dark:text-white" />
      <span class="sr-only">Menu</span>
    </button>
    )
}

function MenuButton() {
  return (
    <button key="MenuButton" name="menu" arial-label="menu" class="bg-white dark:bg-[#151515]
    h-[40px] w-[40px] rounded-full p-2 border dark:border-[#666] scale-up">
      <Menu1 className="text-[#151515] dark:text-white" />
      <span class="sr-only">Menu</span>
    </button>
    )
}

function ProfileButton() {
  return (
    <Link to="/settings" role="button" name="profile" arial-label="profile" class="bg-white
    dark:bg-[#151515] h-[40px] w-[40px] rounded-full p-2 border
    dark:border-[#666]">
      <User className="text-black dark:text-white" />
      <span class="sr-only">Profile</span>
    </Link>
    )
}

function CurrentSection({ section }) {
  return (
    <div class="flex items-center justify-center h-full" key="CurrentSection">
      <h1 class="text-[#222] font-extrabold text-2xl dark:text-[#ddd]" style:font-family="Roboto">{section || ''}</h1>
    </div>
    )
}

export function Header() {
  const cPath = getCurrentPath();
  onMount(() => {
    window.addEventListener('scroll', handleScroll);
  return () => {
    window.removeListener('scroll', handleScroll);
  }
  })
  return (
    <section role="nav" class={`h-[50px] border-0 bg-white dark:bg-[#151515]
    ${headerClass.value}`}
    bind:this={setTransitionDuration}>
      <div class="h-full w-full flex items-center justify-between px-2 py-1">
        { cPath === "/" ? <MenuButton /> : <GoBack /> }
        <CurrentSection section={
          cPath === "/" ? "Home" :
          cPath.startsWith("/messages") ? "Messages" :
          cPath.startsWith("/message") ? "Email" :
          cPath.startsWith("/projects") ? "Projects" :
          cPath.startsWith("/edit") ? "Editor" :
          cPath === "/settings" ? "Settings" : ''
        } />
        <ProfileButton />
      </div>
    </section>
   )
}


function BottomBarItem({ children, linkTo }) {
  return (
    <div class={`h-[45px] w-[45px] p-2 mx-1 grid content-center text-[#262626]
    dark:text-[#ddd]
    active:bg-[#c5c5c55a] active:scale-90 rounded-full ${ getCurrentPath() === linkTo ? classActive : ""}`}
    click$={() => changeRoute(linkTo)}>
      {children}
    </div>
    )
}

export function BottomBar() {
  return (
    <footer class="w-full bg-white dark:bg-[#0e0d0d] h-[45px] border-t dark:border-t-[#666] fixed bottom-0 left-0 right-0 py-1">
      <div class="h-full w-full flex items-center justify-evenly">
        <BottomBarItem linkTo="/">
          <House className="font-extrabold" />
        </BottomBarItem>
        <BottomBarItem linkTo="/messages">
          <ChatCircle className="font-extrabold" />
        </BottomBarItem>
        <BottomBarItem linkTo="/projects">
          <Books className="font-extrabold" />
        </BottomBarItem>
        <BottomBarItem linkTo="/settings">
          <UserGear className="font-extrabold" />
        </BottomBarItem>
      </div>
    </footer>
    )
}
