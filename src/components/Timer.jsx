import React, { useEffect, useState } from "react";

export function Timer({ initialTime }) {
    console.log("Rendering the Timer");
    const [time, setTime] = useState(Number.parseInt(initialTime,10));

    console.log(`time = ${time}`);

    useEffect(() => {
        console.log(`The Timer is committed`);

        return () => {
            console.log(`The Timer is about to be cleaned up`)
        }
    });

    return <div>
        { time } Seconds
        <button onClick={() => setTime(time + 1)}>+1</button>
    </div>
}