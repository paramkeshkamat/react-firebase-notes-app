import { useContext } from "react";
import { AuthContext } from "../context/context";
import { auth } from "../firebase";
import { Avatar } from "@material-ui/core";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/logo.png" alt="logo" />
          <h1>Notes</h1>
        </div>
        <div className={styles.user}>
          <Avatar src={currentUser.photoURL} />
          <button
            className={styles.signOutButton}
            onClick={() => auth.signOut()}
          >
            sign out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
