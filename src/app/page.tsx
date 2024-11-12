export const dynamic = "force-dynamic";
export const revalidate = 60;

import { Home } from "@/components/home";
import { fetchFrogs } from "@/app/fetchFrogs";

export default async function HomePage() {
  const frogs = await fetchFrogs();
  return <Home frogs={frogs} />;
}
