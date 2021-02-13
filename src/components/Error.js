import { BiErrorCircle } from "react-icons/bi";
import styles from "../styles/Error.module.css";

const Error = () => {
  return (
    <p className={styles.error}>
      <BiErrorCircle />
      Note cannot be blank!
    </p>
  );
};

export default Error;
