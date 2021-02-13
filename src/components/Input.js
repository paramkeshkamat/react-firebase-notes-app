import { useState, useContext } from "react";
import { AuthContext } from "../context/context";
import { db } from "../firebase";
import firebase from "firebase/app";
import { v4 as uuid } from "uuid";
import styles from "../styles/Input.module.css";

const Input = () => {
  const { currentUser } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  const addUser = (user) => {
    db.collection("notes")
      .doc(user.id)
      .set({
        username: currentUser.displayName,
        ...user,
        created: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch((err) => console.log(err.message));
    resetInputs();
    setShowNote(false);
  };

  const resetInputs = () => {
    setTitle("");
    setNote("");
  };

  return (
    <div className={styles.Input}>
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setShowNote(true)}
      />
      {showNote && (
        <div>
          <textarea
            placeholder="Add a Note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button
            className={styles.AddButton}
            onClick={() =>
              addUser({ id: uuid(), title, note, isCompleted: false })
            }
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
