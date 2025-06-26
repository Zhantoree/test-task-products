import React, {FC, useState} from "react";

interface TextShortenerProps {
    text: string;
    maxLength: number;
}

const TextShortener: FC<TextShortenerProps> = ({ text, maxLength }) => {
    const [isTruncated, setIsTruncated] = useState(true);

    const toggleTruncate = () => {
        setIsTruncated(!isTruncated);
    };

    const truncatedText = isTruncated ? text.slice(0, maxLength) + (text.length > maxLength ? '...' : '') : text;

    return (
        <div>
            <p className="text-gray-700">
                {truncatedText}
            </p>
            {text.length > maxLength && (
                <button onClick={toggleTruncate} className="text-blue-500 hover:underline focus:outline-none">
                    {isTruncated ? 'Show More' : 'Show Less'}
                </button>
            )}
        </div>
    );
}

export default TextShortener;