import React from 'react';
import send from "../assets/send.svg";

const InputForm = ({ value, setValue, createChat }) => {
    return (
        <form
            action={createChat}
            className="w-full max-w-2xl bg-white p-2 rounded-xl flex items-center gap-2 mx-auto shadow-md"
        >
            <textarea
                name="prompt"
                value={value}
                placeholder="Ask something..."
                onChange={(e) => setValue(e.target.value)}
                rows={1}
                className="flex-1 resize-none px-4 py-2 rounded-md text-gray-900 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 p-2 rounded-full transition-all duration-200"
            >
                <img src={send} alt="Send" className="w-6 h-6 invert" />
            </button>
        </form>

    );
};

export default InputForm;