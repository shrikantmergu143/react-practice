import React, { useReducer } from 'react'
function reducer(count: number, action:"increment" | "decrement") {
    if (action == "decrement") {
        return count - 1;
    }
    if (action == "increment") {
        return count + 1;
    }
    return count;
}
export default function UseReducer() {
    const [counter, dispatch] = useReducer(reducer, 0);

  return (
    <div>
        <h1>Count: {counter}</h1> {/* Display the current count */}
        <button className='px-4 py-2 bg-primary text-white rounded-full' onClick={()=>dispatch("increment")}>Increment</button> {/* Increment the count */}
        <button className='px-4 py-2 bg-primary text-white rounded-full' onClick={()=>dispatch("decrement")}>Decrement</button> {/* Decrement the count */}
    </div>
  )
}
