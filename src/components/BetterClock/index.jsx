import React from 'react';
import useClock from '../../hooks/useClock';
import useMagicColor from '../../hooks/useMagicColor';
import './BetterClock.css';

function BetterClock(props) {
    const { timeString } = useClock();
    const { color } = useMagicColor();
    return (
        <div className="better-clock">
            <p className="better-clock__time" style={{ color: color }}>
                {timeString}
            </p>
        </div>
    );
}

export default BetterClock;