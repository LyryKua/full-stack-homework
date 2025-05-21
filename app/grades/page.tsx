'use client';

import { useState } from "react";

export default function Grades() {
  const [subject, setSubject] = useState('Math');
  const [value, setValue] = useState('0');

  const handleClick = async () => {
    const res = await fetch("/api/grades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, value: parseInt(value) }),
    });
  };

  return (
    <div>
      <select value={subject} onChange={(e) => setSubject(e.target.value)}>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="History">History</option>
      </select>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        min="0"
        max="100"
      />

      <button onClick={handleClick} disabled={!(parseInt(value) <= 100 && parseInt(value) >=0)}>Submit</button>
    </div>
  );
}
