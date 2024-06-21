import HomePage from "@/components/root/HomePage";
import WelcomePage from "@/components/root/WelcomePage";
import { authUser, getUser } from "@/server/actions/user.action";

const Home = async () => {
  let auth = await authUser();

  return <div>{auth ? <HomePage /> : <WelcomePage />}</div>;
};

export default Home;
