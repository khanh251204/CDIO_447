
import styles from "./Button.module.css";

function Button({ type = "button", text, onClick }) {
  return (
    <button type={type} onClick={onClick} className={styles.btn}  >
      {text}
    </button>
  );
}

export default Button;