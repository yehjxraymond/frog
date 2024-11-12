"use client";

import { postFrog } from "@/app/postFrog";
import { Frog } from "@prisma/client";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import Link from "next/link";
import { useState } from "react";

const creatorFrog =
  "https://dc7.getfrogs.xyz/necklace/83c0c816-27e9-4068-9ba6-5d08ae326dc9";

export const Home = ({ frogs }: { frogs: Frog[] }) => {
  const [url, setUrl] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postFrog(url);
      alert("Frog added!");
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const data = detectedCodes.map((code) => code.rawValue)[0];
    if (data) {
      postFrog(data)
        .then(() => {
          alert("Frog added!");
        })
        .catch((error) => {
          if (error instanceof Error) {
            console.error(error.message);
          } else {
            console.error("An unknown error occurred");
          }
        });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    console.error(error);
  };

  const toggleScanner = () => setIsScannerOpen(!isScannerOpen);

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
      <button onClick={toggleScanner}>Scan QR Code</button>
      {isScannerOpen && <Scanner onScan={handleScan} onError={handleError} />}
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
            <th>Froggo ID</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>creator</td>
            <td>
              <Link href={creatorFrog} target="_blank">
                {creatorFrog}
              </Link>
            </td>
          </tr>
          {frogs.map((frog, index) => (
            <tr key={frog.id}>
              <td>{frogs.length - index}</td>
              <td>
                <Link href={frog.url} target="_blank">
                  {frog.url}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
