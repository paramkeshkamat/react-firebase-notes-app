import { useContext } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AuthContext } from "./context/context";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  return <div className="App">{currentUser ? <Home /> : <Login />}</div>;
};

export default App;
