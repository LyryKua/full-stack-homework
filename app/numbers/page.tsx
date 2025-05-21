'use client';

import { ChangeEventHandler, useEffect, useState } from "react";
import { Number } from '@/app/api/numbers/route'

export default function Numbers() {
  const [value, setValue] = useState(0)
  const [numbers, setNumbers] = useState<Number[]>([])

  useEffect(() => {
    console.log('effect')
    const fetchNumbers = async () => {
      const res = await fetch('/api/numbers');
      const data = await res.json();
      setNumbers(data)
    }

    fetchNumbers()
  }, [])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(parseInt(e.target.value))
  }

  const handleBtnClick = async () => {
    const res = await fetch("/api/numbers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ value }),
    });
    const [newNbr] = await res.json()
    setNumbers(prev => [...prev, newNbr])
  }

  return (
    <>
    <input type="number" value={value} onChange={handleChange} placeholder="Enter non-zero integer"/>
    <button onClick={handleBtnClick}>add</button>
    <table border={1} cellSpacing="0" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th>ID 1</th>
          <th>Number 1</th>
          <th>ID 2</th>
          <th>Number 2</th>
          <th>Sum</th>
        </tr>
      </thead>
      <tbody>
        {numbers.map((nbr, i, arr) => i === arr.length - 1 ? null : (
          <tr key={nbr.id}>
            <td>{nbr.id}</td>
            <td>{nbr.value}</td>
            <td>{arr[i + 1].id}</td>
            <td>{arr[i + 1].value}</td>
            <td>{nbr.value + arr[i + 1].value}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </>
  );
}
