import { createData } from "brace-jsx"
import { Link, navigate } from "brace-jsx/router"
import { Core } from "utiliti-js";
import { inStore } from "../services/store"
import { BooksFill } from "../assets/icons/books"
import { ChatFill } from "../assets/icons/chat"
import { ArrowRightBold } from "../assets/icons/arrows"
import { Pencil } from "../assets/icons/pencil"

const df = new Core.DateFilter();

function EditButton({ onClick }) {
  return (
    <button name="edit" arial-label="edit" class="bg-white
    dark:bg-[#151515] h-[40px] w-[40px] rounded-full p-2 border
    dark:border-[#666] active:scale-80" click$={onClick}>
      <Pencil className="text-black dark:text-white" />
      <span class="sr-only">Edit Project</span>
    </button>
    )
}

function Action1() {
  return (
    <div class="w-full rounded-2xl bg-[orange] dark:bg-[#f2c169] bg-opacity-10
    flex items-center justify-between py-4 px-3" style:font-family="Roboto"
    click$={() => navigate('/edit', "New Project", {type: 'new'})}>
      <div class="flex flex-col items-start justify-between">
        <h1 class="text-[16px] font-bold text-[orange] dark:text-[#71663e]">Add Projects</h1>
        <p class="uppercase font-bold text-left text-[10px] text-[#aaa]">New & Better</p>
      </div>
      <div class="w-[30%] h-full">
        <BooksFill className="fill-[orange]" />
      </div>
    </div>
    )
}

function Action2() {
  return (
    <div class="w-full rounded-2xl bg-[purple] dark:bg-[#e76ae7e9] bg-opacity-10 flex items-center justify-between py-4 px-3" style:font-family="Roboto">
      <div class="flex flex-col items-start justify-between">
        <h1 class="text-[16px] font-bold text-[purple] dark:text-[#270046]">Messages</h1>
        <p class="uppercase font-bold text-left text-[10px] text-[#aaa]">Fresh Clients</p>
      </div>
      <div class="w-[30%] h-full">
        <ChatFill className="fill-purple-600" />
      </div>
    </div>
    )
}

function MessageBar({ isUnread, name, subject, body, to }) {
  return (
    <Link to={to} class="flex items-center my-2">
      <div class="h-[50px] w-[50px] rounded-lg bg-purple-700 bg-opacity-20">
      </div>
      <div class="py-1 ml-3">
        <h1 class="font-extrabold dark:text-[#f3f3f3] text-[16px]">{name}</h1>
        <p class="text-gray-600 dark:text-[#dedede] font-medium
        text-[12px]">{subject}</p>
        <p class="text-gray-400 dark:text-[#dedede] font-normal text-[10px]">{body}</p>
      </div>
      {isUnread && <div class="h-2 w-2 rounded-full bg-purple-600 mx-auto">
      </div> || <comment />}
    </Link>
    )
}
 
function MessagesSegment() {
  const messages = inStore.getState().value.messages;
  return (
  <div>
    <SegmentHeader title="Recent Messages" href="/messages" />
    <div class="py-3">
      {messages.slice(0,10).map(({ name, message, subject, _id }) =>
      (<MessageBar to={`/message/${_id}`} {...{name, subject, body: message.split("").slice(0,42).join("")+'...' }} isUnread={false} />))}
    </div>
  </div>
    )
}

function Segment ({ children }) {
  return (
    <div class="border dark:border-[#666] rounded-2xl p-3 my-3">{children}</div>
    )
}

function SegmentHeader ({ title, href }) {
  return (
        <div class="flex items-center justify-between px-2">
          <h3 class="font-bold text-gray-800 text-lg dark:text-[#eee]"
          style:font-family="Roboto">{title}</h3>
          <Link title={title} to={href} class="text-gray-600 dark:text-[#cecece] h-10 w-10 p-2 my-auto rounded-full hover:bg-[#161a1d27] active:scale-80">
            <ArrowRightBold />
          </Link>
        </div>
    )
}

function ProjectItem({ title, id, category, createdAt, image }) {
  return (
    <div class="flex items-center my-3" key={id}>
      <div class="overflow-hidden h-[70px] w-[70px] rounded-lg bg-black dark:bg-gray-50 bg-opacity-20">
        <img loading="lazy" class="h-full w-full object-cover"
        src={image.includes("http") ? image : `http://localhost:8000${image}`} />
      </div>
      <div class="py-1 ml-3">
        <h1 class="font-extrabold text-[#333] text-[18px] dark:text-[#fefefe]"
        style:font-family="Roboto">
          {title}
        </h1>
        <p class="text-gray-600 font-medium text-[12px] dark:text-[#ddd]">
          {`A ${category} Project, Created ${createdAt}`}
        </p>
      </div>
      <div class="mx-auto">
        <EditButton onClick={() => {
          navigate(`/projects/${id}`)
        }} />
      </div>
    </div>
  );
}

const selectedCategory = createData('All');
const selectedClass = 'border-b-2 border-b-[#121212] dark:border-b-[purple] dark:text-[#d142f8] font-bold text-black'

function ProjectSegment() {
  const projects = inStore.getState().value.projects;

  // Filter projects based on the selected category
  const filteredProjects = selectedCategory.value === 'All' ? projects : projects.filter(project => {
    return project.category.toLowerCase().trim() ===
    selectedCategory.value.toLowerCase().trim();
  });
  
  return (
    <div>
      <div class="mb-2">
        <SegmentHeader title="Projects" href="/projects" />
      </div>
      <div class="h-[25px] px-2 w-full border-b-[0.8px] border-b-[#5e5b5b] flex items-baseline justify-between text-gray-700 dark:text-[#eee]">
        <p
          class={`${selectedCategory.value === 'All' ? selectedClass : ''} w-full text-[16px] mx-2 text-center`}
          click$={() => selectedCategory.set('All')}
        >
          All
        </p>
        <p
          class={`w-full mx-2 text-center text-[16px] font-medium
          ${selectedCategory.value === 'Svelte' ? selectedClass : ''}`}
          click$={() => selectedCategory.set('Svelte')}
        >
          Svelte
        </p>
        <p
          class={`w-full mx-2 text-center text-[16px] font-medium
          ${selectedCategory.value === 'Angular' ? selectedClass : ''}`}
          click$={() => selectedCategory.set('Angular')}
        >
          Angular
        </p>
        <p
          class={`w-full mx-2 text-center text-[16px] font-medium
          ${selectedCategory.value === 'SvelteKit' ? selectedClass : ''}`}
          click$={() => selectedCategory.set('SvelteKit')}
        >
          SvelteKit
        </p>
        <p
          class={`w-full mx-2 text-center text-[16px] font-medium
          ${selectedCategory.value === 'React' ? selectedClass : ''}`}
          click$={() => selectedCategory.set('React')}
        >
          React
        </p>
      </div>
      <div class="mt-6 mx-auto w-full" key={selectedCategory.value}>
        { filteredProjects.length > 0 && filteredProjects.map((project) => (
          <ProjectItem
            id={project._id}
            title={project.title}
            category={project.category}
            createdAt={df.text(new Date(project.createdAt))}
            image={project.img_url}
          />
        )) || <p class="font-bold text-center my-1">No project found</p>}
      </div>
    </div>
  );
}

export default function Home() {
  return (
  <section class="h-full w-full" key="Home component">
    <div class="mt-3 mx-3 h-full">
      <div class="grid grid-cols-2 grid-rows-1 gap-3 mb-3">
        <Action1 />
        <Action2 />
      </div>
      <Segment>
        <MessagesSegment />
      </Segment>
      <Segment>
        <ProjectSegment />
      </Segment>
    </div>
  </section>
  )
}