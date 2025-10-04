import { useState } from 'react';
import type { Message } from "../types/types";

const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
        <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
    </svg>
);

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 12l5 5l10 -10" />
    </svg>
);

export const CopyBtn = ({ message }: { message?: Message }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        if (message?.content) {
            navigator.clipboard.writeText(message.content);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    if (message?.role !== 'Bot') {
        return null;
    }

    return (
        <button 
            onClick={handleCopy}
            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors duration-200 relative"
        >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
            <div className={`absolute bottom-full mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded-md transition-opacity duration-300 ${isCopied ? 'opacity-100' : 'opacity-0'}`}>
                Copiado!
            </div>
        </button>
    );
};