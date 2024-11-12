import { useEffect, useState } from "react";
import { fetchFrogs } from "./fetchFrogs";
import { postFrog } from "./postFrog";
import { Frog } from "@prisma/client";
import Link from "next/link";

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
      <div>
        <h1 className="text-2xl">Frog Finder</h1>
        <p>
          A directory of frog friends you can find at Devcon. Add you frog url
          by scanning your frog QR code and add the url that has the format of
          (http://dc7.getfrogs.xyz/necklace/...) here.
        </p>
        <p>
          Then add friends by going down the list and clicking on each frog url
          to add them!
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Frog URL"
        />
        <button type="submit">Submit</button>
      </form>
      <div className="text-2xl">
        Total frog friends you can find here: {frogs.length}
      </div>
      <table>
        <thead>
          <tr>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {frogs.map((frog) => (
            <tr key={frog.id}>
              <td>
                <Link href={frog.url} target="_blank">{frog.url}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
