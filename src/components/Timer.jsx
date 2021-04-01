import React, { useEffect, useRef, useState } from "react";

export function Timer({ initialTime }) {
    console.log("Rendering the Timer");
    const [time, setTime] = useState(Number.parseInt(initialTime,10));

    console.log(`time = ${time}`);

    const timeRef = useRef();

    useEffect(() => timeRef.current = time);

    useEffect(() => {
        console.log("Setting interval");
        const timerId = setInterval(() => {
            console.log("TICK");
            setTime(timeRef.current + 1);
        }, 1000);

        return () => {
            console.log("Clearing interval");
            clearInterval(timerId);
        }
    }, [])

    return <div>
        { time } Seconds
        <button onClick={() => setTime(time + 1)}>+1</button>
    </div>
}