import './index.css';
import { use, withReducer, Mount } from "brace-jsx";

async function fetchVideoData(searchQuery) {
  return await new Promise(async (resolve, reject) => {
    try {
    const response = await fetch(
    `http://localhost:3000/v1/search/?q=${encodeURIComponent(searchQuery)}`
  );
    setTimeout(async function() {
      resolve(await response.json());
    }, 5000);
    } catch (e) {
      reject(e);
    }
  }) 
  
}

const musicStore = { items: [], error: undefined, loading: false };

const [results, dispatch] = withReducer(musicStore, searchReducer);

function searchReducer(state, action) {
  if (action.type === "GET") {
    //dispatch({ type: "LOADING" });
    fetchVideoData("").then((data) =>
      dispatch({
        loading: true,
        type: "SAVE",
        data,
      })
    ).catch(error => {
      dispatch({
        loading: true,
        type: "SAVE",
        error,
      })
    });
    return { ... state, loading: true }
  }
  if (action.type === "SAVE") {
    return { ...state, items: action.data, error: action?.error, loading: false };
  }
  if (action.type === "SEARCH") {
    fetchVideoData(action.query).then((data) =>
      dispatch({
        loading: true,
        type: "SAVE",
        data,
      })
    );
    return { ... state, loading: true }
  }
  return { ... state, loading: false }
}

function SkeletonLoader() {
  return (
    <div class="bg-gray-200 rounded-md animate-pulse my-2 p-3">
      <div class="h-40"></div>
      <div class="h-6 w-3/4 mt-4 bg-gray-300"></div>
      <div class="h-4 w-1/2 mt-2 bg-gray-300"></div>
    </div>
  );
}

function App2() {
  const data = results().items
  const error = results().error
  const loading = results().loading

   
  if (results().items.length < 1) {
    dispatch({ type: "GET" });
  }

  return (
    <div class="min-h-screen bg-gray-100">
      <h1 class="text-3xl font-bold mb-4">Search App</h1>
      <div class="max-w-3xl mx-auto py-8 px-4">
        <form
          class="mb-8"
          submit$preventDefault$={(e) => {
            dispatch({
              type: "SEARCH",
              query: e.target.search.value,
            });
          }}
        >
          <div class="flex items-center">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="searchQuery"
              type="search"
              placeholder="Enter your search query"
              name="search"
            />
            <button
              class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {loading ? "Loading..." : "Search"}
            </button>
          </div>
        </form>
        <div>
          <h2 class="text-2xl font-bold mb-4">Search Results</h2>
          {error ? (
            <p>Error: {error?.message || "An error occurred"}</p>
          ) : (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                <div key="Loader">
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                </div>
              ) : <div>{(
                data.items.map((item, index) => (
                  <div
                    class="bg-white rounded shadow-md p-4 flex my-2 flex-col"
                    key={index}
                  >
                    <div class="mb-2">
                      <img
                        class="w-full h-auto"
                        src={item.snippet.thumbnails.high.url}
                        alt="Thumbnail"
                      />
                    </div>
                    <div class="mb-2">
                      <h3 class="text-xl font-bold">{item.snippet.title}</h3>
                      <p class="text-gray-700">{item.snippet.description}</p>
                    </div>
                    <a
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-auto self-end"
                      href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Video
                    </a>
                  </div>
                ))
              )}</div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


function App() {
  const { data, error } = use(async () => {
    const searchQuery = "Asake Great Guy";
    const response = await fetch(
      `http://localhost:3000/v1/search/?q=${encodeURIComponent(searchQuery)}`
    );
    return await response.json();
  });

  return (
    <div class="min-h-screen bg-gray-100">
      <div class="max-w-3xl mx-auto py-8 px-4">
        <h1 class="text-3xl font-bold mb-4">Search App</h1>
        <form class="mb-8">
          <div class="flex items-center">
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="searchQuery"
              type="search"
              placeholder="Enter your search query"
              name="search"
            />
            <button
              class="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Search
            </button>
          </div>
        </form>
        <div>
          <h2 class="text-2xl font-bold mb-4">Search Results</h2>
          {error ? (
            <p>Error: {error?.message}</p>
          ) : (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data && data.items ? (
                data.items.map((item, index) => (
                  <div
                    class="bg-white rounded shadow-md p-4 flex flex-col"
                    key={index}
                  >
                    <div class="mb-2">
                      <img
                        class="w-full h-auto"
                        src={item.snippet.thumbnails.high.url}
                        alt="Thumbnail"
                      />
                    </div>
                    <div class="mb-2">
                      <h3 class="text-xl font-bold">
                        {item.snippet.title}
                      </h3>
                      <p class="text-gray-700">
                        {item.snippet.description}
                      </p>
                    </div>
                    <a
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-auto self-end"
                      href={`https://www.youtube.com/watch?v=${item.id.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Video
                    </a>
                  </div>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Mount(() => <App2 />, document.querySelector("#root"));
