import React from "react";
import { Message, Cards } from "./index";

const ChatContainer = ({ messages, className }) => {
  // console.log(messages);
  return messages?.length === 0 ? (
    <div
      className={`w-full max-w-[1000px] flex justify-around items-center my-auto mx-auto  ${className}`}
    >
      <Cards />
      <Cards />
      <Cards />
    </div>
  ) : (
    <div
      className={`w-full max-w-[1000px] flex flex-col gap-4 py-6 px-2 my-1 mx-auto overflow-y-scroll ${className}`}
    >
      {messages.map((item) => (
        <Message key={item?.id} id={item?.id} messageType={item?.role} message={item?.content} />
      ))}
    </div>
  );
};

export default ChatContainer;
