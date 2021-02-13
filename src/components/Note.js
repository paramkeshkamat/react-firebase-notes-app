import { useState, useRef, useEffect } from "react";
import Error from "./Error";
import { db } from "../firebase";
import { Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import EditIcon from "@material-ui/icons/Edit";
import styles from "../styles/Note.module.css";

const Note = (user) => {
  const { id, title, note, isCompleted } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newNote, setNewNote] = useState(note);
  const [isError, setIsError] = useState(false);
  const titleRef = useRef(null);

  const deleteNote = () => {
    db.collection("notes")
      .doc(id)
      .delete()
      .catch((err) => console.log(err.message));
  };

  const completedNote = () => {
    db.collection("notes")
      .doc(id)
      .update({
        ...user,
        isCompleted: !isCompleted,
      });
  };

  const editNote = () => {
    setIsEditing(!isEditing);
    titleRef.current?.focus();
    if (newTitle.length < 1 || newNote.length < 1) {
      setIsError(true);
      setNewTitle(title);
      setNewNote(note);
    } else {
      console.log(titleRef.current);
      db.collection("notes")
        .doc(id)
        .update({
          ...user,
          title: newTitle,
          note: newNote,
        });
    }
  };

  useEffect(() => {
    const error = setTimeout(() => {
      setIsError(false);
    }, 3000);
    return () => clearTimeout(error, 3000);
  }, [isError]);

  return (
    <div style={{ opacity: isCompleted ? 0.5 : 1 }} className={styles.note}>
      {isEditing ? (
        <input
          type="text"
          placeholder="Title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          ref={titleRef}
        />
      ) : (
        <h2>{title}</h2>
      )}
      {isEditing ? (
        <textarea
          placeholder="Edit Note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
      ) : (
        <p>{note}</p>
      )}
      {isError && <Error />}
      <div className={styles.buttons}>
        <Tooltip title="edit" placement="bottom" arrow>
          <button onClick={editNote} className={styles.iconButton}>
            {isEditing ? "Ok" : <EditIcon />}
          </button>
        </Tooltip>
        <Tooltip title="completed" placement="bottom" arrow>
          <button onClick={completedNote} className={styles.iconButton}>
            {isCompleted ? <ClearIcon /> : <CheckIcon />}
          </button>
        </Tooltip>
        <Tooltip title="delete" placement="bottom" arrow>
          <button onClick={deleteNote} className={styles.iconButton}>
            <DeleteIcon />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Note;
