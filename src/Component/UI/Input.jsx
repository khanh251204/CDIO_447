import styles from "./Input.module.css";
function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error
}) {
  return (
    <div className={styles.formGroup}>
      {label && <label>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
export default Input;


