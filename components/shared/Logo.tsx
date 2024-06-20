import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"}>
      {" "}
      <div className="flex_center mb-8">
        <Image height={50} width={200} src="/logo.png" alt="main-logo" />
      </div>
    </Link>
  );
};

export default Logo;
