import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/context";
import Note from "./Note";
import { db } from "../firebase";
import styles from "../styles/Notes.module.css";

const Notes = () => {
  const { currentUser } = useContext(AuthContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection("notes")
      .where("username", "==", currentUser.displayName)
      .onSnapshot((snapShot) => {
        setNotes(snapShot.docs.map((doc) => doc.data()));
      });
    return () => unsubscribe();
  }, [currentUser]);

  return (
    <div className={styles.notes}>
      {notes.map((note) => (
        <Note key={note.id} {...note} />
      ))}
    </div>
  );
};

export default Notes;
