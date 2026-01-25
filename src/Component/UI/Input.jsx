import styles from "./Input.module.css";
function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,  
}) {
  return (
    <div className={styles.formGroup}>
      {label && <label>{label}</label>}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}      />
    </div>
  );
}
export default Input;


