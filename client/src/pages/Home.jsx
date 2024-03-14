import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return <div>{"Home"}</div>;
}

export default Home;
