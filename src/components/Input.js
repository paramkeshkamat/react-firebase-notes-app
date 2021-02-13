import { useState } from "react";
import { db } from "../firebase";
import { v4 as uuid } from "uuid";
import styles from "../styles/Input.module.css";

const Input = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [showNote, setShowNote] = useState(false);

  const handleClick = () => {
    setShowNote(false);
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
          <button className={styles.AddButton} onClick={handleClick}>
            Add...
          </button>
        </div>
      )}
    </div>
  );
};

export default Input;
