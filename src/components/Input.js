import { useState, useContext, useEffect } from "react";
import Error from "./Error";
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
  const [isError, setIsError] = useState(false);

  const addNote = (user) => {
    if (title.length < 1 || note.length < 1) {
      setIsError(true);
    } else {
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
    }
  };

  const resetInputs = () => {
    setTitle("");
    setNote("");
  };

  useEffect(() => {
    const error = setTimeout(() => {
      setIsError(false);
    }, 3000);
    return () => clearTimeout(error, 3000);
  }, [isError]);

  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setShowNote(true)}
      />
      {showNote && (
        <div className="input-bottom">
          <textarea
            placeholder="Add a Note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          {isError && <Error />}
          <button
            className={styles.addButton}
            onClick={() =>
              addNote({ id: uuid(), title, note, isCompleted: false })
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
