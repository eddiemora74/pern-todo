export default function BackButton() {
  function handleClick() {
    if (process.env.NODE_ENV === "development") {
      window.location.replace("http://localhost:8080");
    } else {
      window.location.replace("/");
    }
  }

  return (
    <div className="back-btn-container">
      <button className="back-btn" onClick={handleClick}>
        <i className="fi-sr-arrow-left"></i>
      </button>
    </div>
  );
}
