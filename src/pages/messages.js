import './chat.css';
import { Core } from "utiliti-js";
import { inStore } from "../services/store";
import { navigate } from "brace-jsx/router";
const df = new Core.DateFilter();

export default function ChatComponent() {
  const messages = inStore.getState().value.messages;

  return (
    <div class="container px-2 chat-container">
      <h2 class="text-3xl font-bold my-3 ml-1">Messages</h2>
      <div class="chat-list">
        {messages.map((message) => (
          <div class="chat-item" key={message._id} on:click={() => navigate("message/"+message._id)}>
            <img src={"https://placekitten.com/100/100"} alt="User Avatar" class="my-2 mx-3 h-[45px] w-[45px] rounded-full object-cover" />
            <div class="content">
              <div class="w-[70%]">
                <div class="name">{message.name}</div>
                <div class="message">{message.message}</div>
              </div>
              <span class="my-auto text-gray-500 text-[12px] mr-2
              font-medium">{df.formatDate(new Date(message?.createdAt), "dd/mm HH:MM")}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
