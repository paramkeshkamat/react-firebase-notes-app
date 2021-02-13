import { db } from "../firebase";
import { Tooltip } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import styles from "../styles/Note.module.css";

const Note = (user) => {
  const { id, title, note, isCompleted } = user;

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

  return (
    <div style={{ opacity: isCompleted ? 0.5 : 1 }} className={styles.note}>
      <h2>{title}</h2>
      <p>{note}</p>
      <div className={styles.buttons}>
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
