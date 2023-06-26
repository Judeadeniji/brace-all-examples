import { navigate } from "brace-jsx/router" 
import { Core } from "utiliti-js";
import { inStore } from "../services/store"
import { Pencil } from "../assets/icons/pencil"

const df = new Core.DateFilter();

export default function ProjectItem() {
  const { _id, title, body, author, createdAt, updatedAt, repo, link, img_url } = inStore.getState().value.currentProject;
  return (
  <div class="app-container" key={_id}>
    <div class="project-card">
      <div class="image-container">
        <img src={img_url.includes("http") ? img_url :
        `http://localhost:8000${img_url}`} alt={title} />
      </div>
      <div class="details">
        <h2>{title}</h2>
        <p>{body}</p>
        <div class="info">
          <i class="bi bi-arrow-clockwise"></i>
          <span>Updated at: {df.text(new Date(updatedAt))}</span>
        </div>
        <div class="info">
          <i class="bi bi-calendar-check"></i>
          <span>Created at: {df.text(new Date(createdAt))}</span>
        </div>
        <div class="info">
          <i class="bi bi-person"></i>
          <span>Author: {author}</span>
        </div>
        <div class="info">
          <i class="bi bi-github"></i>
          <a href="https://github.com/yourusername/your-repo" target="_blank" class="link">GitHub Repo</a>
        </div>
        <div class="buttons">
          <button class="button edit" on:click={() => navigate('/edit', null, { _id, type: 'update' })}>Edit</button>
          <button class="button delete" on:click={() => { 
          inStore.dispatch({
          type: 'delete-project', value: {_id} });
            navigate('/');
          }}>Delete</button>
        </div>
      </div>
    </div>
  </div>
    )
}