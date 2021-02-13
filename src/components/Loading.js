import styles from "../styles/Loading.module.css";

const Login = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Login;
