import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
// import { authOptions } from "../../app/api/auth/[...nextauth]/route";

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  return session?.user;
}