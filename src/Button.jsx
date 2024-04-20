function Button({ children, theme, onClick, disabled }) {
  return (
    <button className={theme} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
