import React, { useState, useEffect } from 'react';

// Configuration for each light
const config = {
    green: {
        duration: 3000,
        next: 'yellow',
    },
    yellow: {
        duration: 500,
        next: 'red',
    },
    red: {
        duration: 4000,
        next: 'green',
    },
};

function TrafficLight() {
    // State to hold the current color of the light
    const [currentColor, setCurrentColor] = useState('green');

    useEffect(() => {
        // Function to handle the transition to the next color
        const transitionToNextColor = () => {
            const { duration, next } = config[currentColor];
            const timerId = setTimeout(() => {
                setCurrentColor(next);
            }, duration);
            return timerId;
        };

        transitionToNextColor()
        // Clear any existing timers when the component mounts or the current color changes
        return () => {
            clearTimeout(transitionToNextColor());
        };
    }, [currentColor]); // Re-run the effect if the currentColor changes

    return (
        <div className="traffic-light">
            {Object.keys(config).map((color) => (
                <div
                    key={color}
                    className='light'
                    style={{
                        backgroundColor: currentColor === color ? color : 'lightgrey',
                    }}
                />
            ))}
        </div>
    );
}

export default TrafficLight;
