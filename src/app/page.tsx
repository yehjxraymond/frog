"use client";

import { useEffect, useState } from "react";
import { fetchFrogs } from "./fetchFrogs";
import { postFrog } from "./postFrog";

export default function Home() {
  const [url, setUrl] = useState("");
  const [frogs, setFrogs] = useState<Frog[]>([]);

  // Fetch all frogs on component mount
  useEffect(() => {
    fetchFrogs().then((frogs) => setFrogs(frogs));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newFrog = await postFrog(url);
      setFrogs([...frogs, newFrog]);
      setUrl("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Frog URL"
        />
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {frogs.map((frog) => (
            <tr key={frog.id}>
              <td>{frog.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
