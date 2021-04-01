import React, { useState } from "react";

export function Timer({ initialTime }) {
    console.log("Rendering the Timer");
    const [time, setTime] = useState(Number.parseInt(initialTime,10));

    console.log(`time = ${time}`);
    
    return <div>
        { time } Seconds
        <button onClick={() => setTime(time + 1)}>+1</button>
    </div>
}