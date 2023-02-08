import HomeC from "./HomeC";
import HomeG from "./HomeG";

const Home = (props) => {
  const type = props?.account?.type;
  const isGreener = type === "__greener";

  if (isGreener) return <HomeG />;
  return <HomeC />;
};

export default Home;
