"use client";

import InitialPage from "@/components/root/InitialPage";
import WelcomePage from "@/components/root/WelcomePage";

const Home = () => {
  let auth = true;

  return <div>{auth ? <InitialPage /> : <WelcomePage />}</div>;
};

export default Home;
