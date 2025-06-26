'use client';

import React, {
    useState,
    useRef,
    ChangeEvent,
    ClipboardEvent,
    KeyboardEvent,
    useEffect,
} from 'react';

const getDigits = (str: string) => str.replace(/\D/g, '');

function formatPhone(raw: string) {
    const digits = getDigits(raw).slice(0, 11);
    const num = digits.startsWith('7') ? digits : '7' + digits;
    const part2 = num.slice(1, 4);
    const part3 = num.slice(4, 7);
    const part4 = num.slice(7, 9);
    const part5 = num.slice(9, 11);

    let out = '+7';
    if (part2) out += ` (${part2}`;
    if (part2.length === 3) out += ')';
    if (part3) out += ` ${part3}`;
    if (part4) out += ` ${part4}`;
    if (part5) out += `-${part5}`;
    return out;
}

function findPosOfDigit(formatted: string, digitIndex: number) {
    let count = 0;
    for (let i = 0; i < formatted.length; i++) {
        if (/\d/.test(formatted[i])) {
            if (count === digitIndex) return i + 1;
            count++;
        }
    }
    return formatted.length;
}

export const MaskedPhoneInput: React.FC<{
    value?: string;
    onChange?: (rawDigits: string) => void;
    placeholder?: string;
}> = ({ value = '', onChange, placeholder = '+7 (___) ___ __-__' }) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [digits, setDigits] = useState(getDigits(value));
    const [display, setDisplay] = useState(() => formatPhone(value));

    useEffect(() => {
        const raw = getDigits(value);
        setDigits(raw);
        setDisplay(formatPhone(raw));
    }, [value]);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Backspace') {
            e.preventDefault();
            const el = inputRef.current!;
            const cursorPos = el.selectionStart ?? el.value.length;
            // Count how many digits before cursor
            const digitBefore = (el.value.slice(0, cursorPos).match(/\d/g) || []).length - 1;
            if (digitBefore >= 0) {
                const newDigits = digits.slice(0, digitBefore) + digits.slice(digitBefore + 1);
                const newDisplay = formatPhone(newDigits);
                setDigits(newDigits);
                setDisplay(newDisplay);
                onChange?.(newDigits);
                // Restore cursor just after removed digit
                setTimeout(() => {
                    const newPos = findPosOfDigit(newDisplay, digitBefore);
                    el.setSelectionRange(newPos, newPos);
                }, 0);
            }
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawInput = e.target.value;
        const newDigits = getDigits(rawInput).slice(0, 11);
        setDigits(newDigits);
        const newDisplay = formatPhone(newDigits);
        setDisplay(newDisplay);
        onChange?.(newDigits);
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        if (!/\d/.test(e.clipboardData.getData('Text'))) {
            e.preventDefault();
        }
    };

    const handleOtherKey = (e: KeyboardEvent<HTMLInputElement>) => {
        // allow digits, arrows, tab
        if (!/[0-9]/.test(e.key) &&
            e.key !== 'ArrowLeft' &&
            e.key !== 'ArrowRight' &&
            e.key !== 'Tab'
        ) {
            e.preventDefault();
        }
    };

    return (
        <input
            ref={inputRef}
            type="tel"
            inputMode="numeric"
            placeholder={placeholder}
            className="border rounded-xl p-2 w-full mr-4 bg-grey-500 text-white text-4xl"
            value={display}
            onKeyDown={(e) => { handleKeyDown(e); handleOtherKey(e); }}
            onChange={handleChange}
            onPaste={handlePaste}
        />
    );
};


export default MaskedPhoneInput;