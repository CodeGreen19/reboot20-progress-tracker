import HomePage from "@/components/root/HomePage";
import WelcomePage from "@/components/root/WelcomePage";
import { getUserIdFromCookie } from "@/server/data/data";

const Home = () => {
  let { id } = getUserIdFromCookie();

  return <div>{id ? <HomePage /> : <WelcomePage />}</div>;
};

export default Home;
