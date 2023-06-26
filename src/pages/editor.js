import { inStore } from "../services/store"

function submitPost(event, Data, type) {
  event.preventDefault();
  const form = event.target;
  inStore.dispatch({
    type: type === 'update' ? 'update-project' : 'new-project',
    value: {
      data: new Data(form),
    }
  });
  event.target.reset();
}


export default function Editor({ query }) {
  const projectToEdit = inStore.getState().value.projects.find(({ _id }) => {
       return _id === query?._id;
    }) || {
      title: '',
      category: '',
      repo: '',
      img_url: '',
      author: "Oluwaferanmi",
      body: ''
    };

  return (
  <div class="app-container editor" key="Editor">
    <form class="editor-form" use:formData={(e, formData) => submitPost(e, formData, query?.type || "new")}>
      <h2 class="title">{query?.type === "new" ? "New Project" : query?.type ===
      "update" ? "Edit Project" : "Add a New Project"}</h2>
      <div class="form-group">
        <label for="title">{projectToEdit.title || "Title"}</label>
        <input type="text" id="title" name="title" placeholder="Enter title"
        value={projectToEdit.title || ""} />
      </div>
      <div class="form-group">
        <label for="category">Category</label>
        <div class="category-dropdown">
          <select id="category" name="category" value={projectToEdit?.category || ""}>
            <option value="" disabled selected>Select category</option>
            <option value="Angular">Angular</option>
            <option value="React">React</option>
            <option value="Brace">Brace</option>
            <option value="JavaScript">Vanilla JavaScript</option>
            <option value="Svelte">Svelte</option>
            <option value="Sveltekit">Sveltekit</option>
            <option value="NextJs">NextJs</option>
            <option value="Tailwind">Tailwind</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label for="image">Image</label>
        <input type="file" id="image" name="image" placeholder="Select Image"
        />
        <label class="file-label" for="image"></label>
        {query?.type === "update" ? (
        <img loading="lazy" src={projectToEdit?.img_url?.includes("http") ?
        projectToEdit?.img_url : `http://localhost:8000${projectToEdit?.img_url}` || ""} class="w-[100%]
        h-auto mr-3 my-4 rounded-xl" />
        ) : <comment />}
      </div>
      <div class="form-group">
        <label for="link">Live Link</label>
        <input type="url" id="link" name="link" value={projectToEdit?.link ||
        ""} placeholder="Enter Live URL" />
      </div>
      <div class="form-group">
        <label for="repo">Repository</label>
        <input type="url" id="repo" name="repo" value={projectToEdit?.repo || ""} placeholder="Enter repository URL" />
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input type="name" id="author" name="author" value="Oluwaferanmi" />
      </div>
      <div class="form-group">
        <label for="body">Body</label>
        <textarea id="body" name="body" placeholder="Enter project description">{projectToEdit?.body || ""}</textarea>
      </div>
      <button type="submit" class="submit-button">Submit</button>
    </form>
  </div>
  )
}