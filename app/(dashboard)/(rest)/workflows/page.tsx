import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { requireAuth } from "@/lib/auth-utils";

const Page = async () => {
  await requireAuth();
  const user = await auth.api.getSession({ headers: await headers() });
  return <div>{user?.user.email}</div>;
};

export default Page;
