import { useState, useEffect } from 'react';

function randomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
}

function useMagicColor() {
    const [color, setColor] = useState('');

    // Change color every 1 second

    useEffect(() => {
        const colorInterval = setInterval(() => {
            let c = randomColor();
            setColor(c);
        }, 1000);

        return () => {
            clearInterval(colorInterval);
        }
    }, []);

    return { color };
}

export default useMagicColor;