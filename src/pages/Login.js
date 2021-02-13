import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { auth, googleProvider } from "../firebase";
import { FaGoogle } from "react-icons/fa";
import styles from "../styles/Login.module.css";

const Login = () => {
  const googleSignIn = () => {
    auth
      .signInWithPopup(googleProvider)
      .then(() => console.log("Sign in success!"))
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginCard}>
        <AccountCircleIcon />
        <button className={styles.signInBtn} onClick={googleSignIn}>
          <FaGoogle />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
