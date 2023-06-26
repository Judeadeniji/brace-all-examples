import { onMount, createData } from 'brace-jsx';
import { Store } from "utiliti-js";

let tasks = createData([]);
let taskText = '';

const reducer = (state, action) => {
  if (action.type === "ADD_TASK") {
    state.update((state) => [...state, action.payload]);
  }
  
  if (action.type === "TOGGLE_TASK") {
    state.update(prevState => prevState.map((task) => task.id === action.payload ? { ...task, completed: !task.completed } : task));
  }
  
  if (action.type === "REMOVE_TASK") {
    state.update(prevState => prevState.filter((task) => task.id !== action.payload));
  }
  
  return state;
};


const tasksStore = new Store(reducer, tasks);

function addTask({ target }) {
  const newTaskText = taskText;
  const task = {
    id: Date.now(),
    text: newTaskText,
    completed: false,
  };

  tasksStore.dispatch({
    type: 'ADD_TASK',
    payload: task,
  });
  target.reset();
}

// Toggle a task's completion status
function toggleTask(id) {
  tasksStore.dispatch({
    type: 'TOGGLE_TASK',
    payload: id,
  });
}

// Remove a task
function removeTask(id) {
  tasksStore.dispatch({
    type: 'REMOVE_TASK',
    payload: id,
  });
}

// Handle the value binding
function newTaskText({ value, target }) {
  taskText = value;
}

export default function TaskComponent() {
  const tasks = tasksStore.getState().value;
  return (
   <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100" key="TaskComponent">
    <h1 class="text-3xl font-bold mb-8">Task Management App</h1>
  
    <form class="flex items-center" on:submit$preventDefault$={addTask}>
      <input type="text" bind:value={newTaskText} placeholder="Enter a task" class="rounded-l-lg p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
      <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg ml-2">Add Task</button>
    </form>
  
    <ul class="mt-8" key="you">
      {tasks.length > 0 ?
        tasks.map((task) =>
         (<li class="bg-white shadow-md rounded-lg w-[300px] mb-4" key={task.id}>
            <div class="flex items-center p-4">
              <input type="checkbox" bind:checked={() => toggleTask(id)} class="form-checkbox h-4 w-4 text-blue-500" />
              <span class="ml-2 flex-grow">{task.text}</span>
              <button on:click={() => removeTask(task.id)} class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">Remove</button>
            </div>
          </li>)) : <p class="text-gray-500">No tasks available.</p>
        }
    </ul>
  </main>
   )
}