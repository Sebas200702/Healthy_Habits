import { useState, useEffect } from 'react';

export default function Scroll () {

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const output = document.getElementById("output");
            if (output) {
                const isAtBottom = output.scrollHeight - output.scrollTop === output.clientHeight;
                setShowButton(!isAtBottom);
            }
        }
        const output = document.getElementById("output");
        if (output) {
            output.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (output) {
                output.removeEventListener("scroll", handleScroll);
            }
        }

    }, []);

    const scrollToBottom = () => {
        const output = document.getElementById("output");
        if (output) {
            output.scrollTop = output.scrollHeight;
        }
    }


    return (
        <div>
            {showButton && (
                <button onClick={scrollToBottom} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                    Scroll to Bottom
                </button>
            )}
        </div>
    );
}