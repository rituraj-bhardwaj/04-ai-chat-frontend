import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import bot from "../assets/bot.svg";
import user from "../assets/user.svg";

const Message = ({ id, messageType, message }) => {
    return (
        <div
            id={id}
            className={`p-2 flex rounded-lg flex-col text-lg text-left text-white`}
        >
            <img src={messageType === "user" ? user : bot} alt="bot or user icon"
                className='w-8 h-8'
            />
            <div className="prose p-2 pl-8">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {message}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default Message;