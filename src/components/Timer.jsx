import React, { useState } from "react";

export function Timer({ initialTime }) {
    const [time, setTime] = useState(initialTime);

    return <div>
        { time } Seconds
    </div>
}