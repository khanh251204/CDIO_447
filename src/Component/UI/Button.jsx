
import styles from "./Button.module.css";

function Button({ type = "button", text, onClick, className }) {
  return (
    <button type={type} onClick={onClick} className={`styles.btn ${className}`} >
      {text}
    </button>
  );
}

export default Button;