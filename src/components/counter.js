import { createData, useFetch, onMount } from 'brace-jsx';

function useRef(initialValue = '') {
  let ref = { current: initialValue };
  return ref;
}



  const count = createData(0);
const Counter = (params) => {
  alert(JSON.stringify(params))
  console.log("component only renders once");
  
  onMount(() => {
    /**
     * useFetch is used once never to be used again
    */
    const data = useFetch(() => ({
      url: "https://jsonplaceholder.typicode.com/todos"
    }))
    return async () => {
      try {
        // data won't be received until component unmounts
        const response = await data;
        const res = await response.json()
        console.log(res, "component has unmounted")
       // after component unmounts for the first time we're done this onMount is discarded
      } catch (e) {}
  }
  })
  const countView = (el) => {
   count.subscribe(c => {
       el.innerHTML = c;
   });
  }

  const increment = () => {
    count.update(p => p + 1);
  };
  const decrement = () => {
    count.update(p => p - 1);
  };


  return (
    <div class="min-h-screen bg-white flex flex-col justify-center items-center">
      <h1 class="text-6xl font-bold text-orange-500 mb-8">Counter App</h1>
      <div class="flex flex-row items-center">
        <button
          class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded-l transition duration-300"
          click$={decrement}
        >
          -
        </button>
        <span class="bg-white text-orange-500 font-bold py-2 px-8 text-4xl
        text-center">
          {count.value}
        </span>
        <button
          class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded-r transition duration-300"
          click$={increment}
        >
          +
        </button>
      </div>
    </div>
  );
}


export default Counter;