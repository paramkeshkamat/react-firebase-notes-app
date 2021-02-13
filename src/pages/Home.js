import Input from "../components/Input";
import Notes from "../components/Notes";
import { auth } from "../firebase";

const Home = () => {
  return (
    <div>
      <button onClick={() => auth.signOut()}>sign out</button>
      <Input />
      <Notes />
    </div>
  );
};

export default Home;
