"use client";

import { postFrog } from "@/app/postFrog";
import { Frog } from "@prisma/client";
import { IDetectedBarcode, Scanner } from "@yudiel/react-qr-scanner";
import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";

const creatorFrog =
  "https://dc7.getfrogs.xyz/necklace/83c0c816-27e9-4068-9ba6-5d08ae326dc9";
const telegram = "https://t.me/whitefables";

export const Home = ({ frogs }: { frogs: Frog[] }) => {
  const [url, setUrl] = useState("");
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await postFrog(url);
      alert("Frog added!");
      window.location.reload();
      setUrl("");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
      alert("Failed to add frog: Probably already in the pool.");
      setUrl("");
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
    <div className="prose dark:prose-invert m-auto p-4">
      <div>
        <h1>Frog Finder</h1>
        <h2>Total frog friends you can find here: {frogs.length}</h2>
        <p>A pool of frog. To participate:</p>
        <ul>
          <li>
            Scan your frog QR code using the button below to add yourself to the
            top of list
          </li>
          <li>
            Add other frog friends by clicking on their url to send them an
            invite
          </li>
        </ul>
        <p>
          Note1: To remember where you&apos;ve stopped just remember the index
          number where you&apos;ve started and stopped.
        </p>
        <p>
          Note2: I&apos;ve wrote about{" "}
          <Link
            href="https://geek.sg/blog/hunting-frogs-a-journey-through-devcon-frog-points-and-starting-a-movements"
            target="_blank"
          >
            my experience building the froggo list
          </Link>
          . Also feel free to{" "}
          <Link href={telegram} target="_blank">
            say hi
          </Link>
          !
        </p>
        <p>
          Note3: Someone else{" "}
          <Link
            href="https://github.com/derrix060/frog_collector"
            target="_blank"
          >
            made a script
          </Link>{" "}
          to automate the link clicking. Thought it&apos;s pretty cool. DYOR
          though.
        </p>
        <div></div>
      </div>
      <Button className="my-6 w-full" size="lg" onClick={toggleScanner}>
        Scan my frog
      </Button>
      {isScannerOpen && <Scanner onScan={handleScan} onError={handleError} />}
      <form onSubmit={handleSubmit} className="my-6">
        <Input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Frog URL"
          className="w-full mb-2"
        />
        <div>
          <Button type="submit">Submit Frog URL Manually</Button>
        </div>
      </form>
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
            <td className="overflow-hidden whitespace-nowrap overflow-x-auto">
              <Link href={creatorFrog} target="_blank">
                {creatorFrog}
              </Link>
            </td>
          </tr>
          {frogs.map((frog, index) => (
            <tr key={frog.id}>
              <td>{frogs.length - index}</td>
              <td className="overflow-hidden whitespace-nowrap overflow-x-auto">
                <Link href={frog.url} target="_blank">
                  {frog.url}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <small>
          Github:{" "}
          <Link href="https://github.com/yehjxraymond/frog" target="_blank">
            Frog
          </Link>
        </small>
      </div>
    </div>
  );
};
