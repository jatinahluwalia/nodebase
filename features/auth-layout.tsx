import Image from "next/image";
import Link from "next/link";
import type React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-muted items-center flex min-h-svh flex-col justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href={"/"}
          className="flex gap-2 items-center self-center font-medium"
        >
          <Image
            src={"/logos/logo.svg"}
            alt="nodebase"
            width={30}
            height={30}
          />
          Nodebase
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
