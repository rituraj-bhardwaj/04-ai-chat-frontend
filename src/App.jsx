import { useState } from 'react'
import './App.css'
import { InputForm, ChatContainer } from './compenents';
import { v4 as uuid } from "uuid";


function App() {
  const [prompt, setPrompt] = useState("");
  const [chats, setChats] = useState([]);
  const [stream, setStream] = useState(false);
  const [error, setError] = useState("");


  // const eventSource = new EventSource("BACKEND_URL");

  
  async function createChat(formData) {
    const id = uuid();
    const newChat = {
      id: id,
      role: "user",
      content: formData.get("prompt"),
      isStreaming: false
    }
    setChats(prev => [...prev, newChat]);
    setPrompt("");

    askAi();
  }

  function updateMessageContent({ id, chunk }) {
    setChats(prev => prev.map((item) => {
      if (item?.id === id && item?.isStreaming === true) {
        return { ...item, content: item.content + chunk }
      }
      return item;
    }));
  }

  function endStreaming({ id, chunk }) {
    setChats(prev => prev.map(item => {
      if (item?.id === id && item?.isStreaming === true) {
        return { ...item, content: item.content + chunk, isStreaming: false }
      }
      return item;
    }));
    setStream(false);
  }

  async function askAi() {
    const id = uuid();
    const aiChat = {
      id: id,
      role: "bot",
      content: "",
      isStreaming: true
    }
    setStream(true);
    setChats(prev => [...prev, aiChat]);

    try {
      setError("");
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat-stream`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });

      const reader = response.body.getReader();
      let lastFragment = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            // Flush the last fragment now that we are done
            if (lastFragment !== "") {
              // yield lastFragment;
              endStreaming({ id: id, chunk: lastFragment });
              // console.log(lastFragment);
            }
            break;
          }
          const data = new TextDecoder().decode(value);
          lastFragment += data;
          const parts = lastFragment.split("\n\n");

          for (let i = 0; i < parts.length - 1; i++) {
            // yield all except for the last part
            // yield parts[i];  
            const message = parts[i];
            updateMessageContent({ id: id, chunk: message });
            // console.log(message);
          }

          // save the last part as the new last fragment
          lastFragment = parts[parts.length - 1];
        }
      } finally {
        reader.releaseLock();
      }

    } catch (error) {
      console.log("error while talking to ai: ", error);
      setError("Something went wrong, try again later.");
    } finally {
      setStream(false);
    }
  }

  return (
    <div>
      <header className="text-2xl font-bold text-white header-gradient p-4 text-center shadow-md">
        💬 Chat-AI
      </header>

      {error && <p className='text-red-600 text-sm p-2'>{error}</p>}
      <ChatContainer messages={chats} className={"h-[80vh]"} />
      <InputForm value={prompt} setValue={setPrompt} createChat={createChat} isStreaming={stream}/>
    </div>
  )
}

export default App
