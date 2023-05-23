import { onMount, createData, useFetch, For } from "brace-jsx";

const todos = createData([])
const todoItem = createData({
  title: '',
  isCompleted: 'false'
})

function addTodo({ target }) {
  fetch("https://jsonplaceholder.typicode.com/todos", {
    method: 'POST',
  body: JSON.stringify({
    ...todoItem?.value,
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
  }).then(response => response.json())
  .then(item => todos.update(p => {
    console.log(p)
    return [item, ...p]
  }))
 /* .then(item => todos.update(p => [item, ...p])) */
  todoItem.reset({silent: true})
  target.reset()
}

function handleInput({ target }) {
    const item = {
      id: todos?.value.length + 1,
      title: target.value,
      completed: false
    }
    todoItem.set(item)
}

function removeTodo() {
  // body...
}

export default function Todo() {
   console.log("Todo updated")
  onMount(async () => {
   console.log("onMount will only run once")
   try {
    // useFetch will only run once through the component's lifetime
    const getTodos = useFetch("https://jsonplaceholder.typicode.com/todos");
      const response = await getTodos;
      const todoList = await response.json();
      todos.set(todoList.splice(0, 10));
     } catch (e) {}
    return () => {
      console.log("component unmounted");
    };
  });
  return (
    <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg">
    <h1 class="text-3xl text-center mb-6">To-Do App</h1>
    <form class="mb-6" type="reset" submit$preventDefault$={addTodo}>
      <div class="flex items-center">
        <input key="input" name="todoInput" type="text" class="flex-grow border-gray-300
        rounded-l py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Add a new task" required bind:input={handleInput} value="" />
        <button type="submit" class="bg-blue-500 hover:bg-transparent text-white
       hover:text-blue-600 py-2 px-4 rounded-r focus:outline-none focus:ring-2
        focus:ring-blue-500">Add</button>
      </div>
    </form>
    <ul id="todoList">
        { todos?.value.length > 0 && todos?.value.map((todo, index) => (<li class="border-b py-2 flex items-center">
          <input type="checkbox" class="mr-2" name="completed"
          value={todo.completed} />
          <span>{todo.title}</span>
          <button class="ml-auto text-red-500 hover:text-red-700
          focus:outline-none" bind:html={insertSvg} click$={removeTodo}>
          </button>
        </li>)) || "Loading..."}
    </ul>
  </div>
    )
}

function insertSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0
  20 20" fill="black">
            <path fill-rule="evenodd" d="M10 1a9 9 0 100 18A9 9 0 0010 1zm2.475 14.95l-.474.475-1.001-1-1.001 1-.474-.475L9.526 14l-1 1.001.475.474L9 15.475l-1.001.474 1 1 .474-.475L10.474 17l1-1.001.475.474-1.475 1.001.475.474 1-1.001-.474-.475L12 16.525l1.001-.474-1-1-.474.475L11.526 14l1.001-1.001z" clip-rule="evenodd" />
          </svg>`
}