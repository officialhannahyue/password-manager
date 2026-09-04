import { getCurrentUser } from "@/actions/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login")
  };
}