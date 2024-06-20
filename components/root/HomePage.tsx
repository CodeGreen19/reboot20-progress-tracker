import { Button } from "@/components/ui/button";

import { logoutUser } from "@/server/actions/user.action";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="my-4">
      this is home page
      <Button onClick={() => logoutUser()}>logout</Button>
      <div>profile info</div>
      <p>name: john, email:email@gmail.com</p>
      <Link href={"/sign-up"}>singup</Link>
    </div>
  );
};

export default HomePage;
