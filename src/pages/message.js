import { navigate } from "brace-jsx/router" 
import { Core, strings } from "utiliti-js";
import { inStore } from "../services/store"
const df = new Core.DateFilter();

export default function MessageComponent() {
  const {
    _id,
    name,
    message,
    email,
    createdAt,
    subject
  } = inStore.getState().value.currentMessage;
  
  return (
    <div class="bg-gray-50 flex items-center justify-center w-full h-full">
      <div class="container mx-auto px-4 py-8">
        <div class="bg-white rounded-lg shadow-lg p-4">
          <h2 class="text-2xl font-bold mb-4">{strings.capitalize(subject)}</h2>
          <div class="bg-gray-100 rounded-lg p-4 mb-4 whitespace-pre-wrap overflow-hidden">
            <p class="mb-4">Dear Jude, 
              <br/>
              <br/>
              {message}
              <br/>
              <br/>
              Best regards,
              <br/>
              {name}
            </p>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <img class="w-8 h-8 rounded-full mr-2" src="https://placekitten.com/100/100" alt="Sender Avatar" />
              <div>
                <p class="text-gray-800 font-semibold text-[17px] text-ellipsis whitespace-pre-wrap">{name}</p>
                <p class="text-gray-600 text-[11px] font-medium">{email}</p>
              </div>
            </div>
            <p class="text-gray-600 text-[12px] font-medium">{df.text(new Date(createdAt))}</p>
          </div>
          <div class="mt-4">
            <a href={"mailto:"+email} class="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded mr-2">Reply</a>
            <a click$={() => {
            inStore.dispatch({ type: 'delete-message', value: { _id } }) 
              navigate('/messages')
            } } class="bg-red-500 hover:bg-red-600 text-white
            font-semibold px-4 py-2 rounded">Delete</a>
          </div>
        </div>
      </div>
    </div>
  );
}
