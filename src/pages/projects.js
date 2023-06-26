import { inStore } from "../services/store"
import { Core } from "utiliti-js";
import { Pencil } from "../assets/icons/pencil"
import { navigate } from "brace-jsx/router"

const df = new Core.DateFilter();

export default function Project({ data }) {
  const projects = inStore.getState().value.projects;

  // Group projects by category
  const groupedProjects = projects.reduce((acc, project) => {
    if (acc[project.category]) {
      acc[project.category].push(project);
    } else {
      acc[project.category] = [project];
    }
    return acc;
  }, {});

  return (
    <div class="h-screen" key="Project Component">
      <h1 class="text-sm text-gray-500 font-bold mt-2 ml-3">
        {df.text(new Date())}
      </h1>
      {Object.entries(groupedProjects).map(([category, projectList]) => (
        <Category key={category} name={category} list={projectList} />
      ))}
    </div>
  );
}

function Category({ name, list }) {
  return (
    <div class="my-4 mx-2">
      <h2
        class="text-2xl inline-block text-gray-700 font-bold px-2 ml-3 border-b-2 border-b-[#527fd3]"
        style:font-family="Roboto"
      >
        {name}
      </h2>
      <Segment>
        {list.map((project) => (
          <ProjectItem id={project._id} project={project} />
        ))}
      </Segment>
    </div>
  );
}

function ProjectItem({ project, id }) {
  return (
    <div class="flex items-center my-3" key={id}>
      <div class="h-[70px] w-[70px] rounded-lg overflow-hidden">
        <img class="h-full w-full object-cover" loading="lazy"
        src={project.img_url.includes("http") ? project.img_url :
        `http://localhost:8000${project.img_url}` } />
      </div>
      <div class="py-1 mx-2">
        <h1 class="font-extrabold text-[#333] text-[18px] dark:text-[#fefefe]"
        style:font-family="Roboto"> {project.title.trim()}
        </h1>
        <p class="text-gray-600 font-medium text-[12px] dark:text-[#ddd]">
          {project.category} Project, Created {df.formatDate(new
          Date(project.createdAt), "ago")}
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

function Segment ({ children }) {
  return (
    <div class="border dark:border-[#666] rounded-2xl p-3 my-3">{children}</div>
    )
}