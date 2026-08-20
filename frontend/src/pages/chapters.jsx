function Chapters() {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Physics</h1>
      <p>Choose a chapter to continue learning.</p>

      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            padding: "20px",
            marginBottom: "15px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Chapter 1 — Introduction to Physics</h2>
          <p>100% completed</p>
        </div>

        <div
          style={{
            padding: "20px",
            marginBottom: "15px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Chapter 2 — Units and Measurements</h2>
          <p>85% completed</p>
        </div>

        <div
          style={{
            padding: "20px",
            marginBottom: "15px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Chapter 3 — Motion</h2>
          <p>72% completed</p>
        </div>

        <div
          style={{
            padding: "20px",
            marginBottom: "15px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Chapter 4 — Force and Laws of Motion</h2>
          <p>40% completed</p>
        </div>
      </div>
    </div>
  );
}

export default Chapters;

