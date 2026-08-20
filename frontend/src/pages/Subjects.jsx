import { useNavigate } from "react-router-dom";

function Subjects() {
  const navigate = useNavigate();

  const subjects = [
    {
      name: "Physics",
      icon: "⚛️",
      progress: 72,
      color: "#6366f1",
    },
    {
      name: "Mathematics",
      icon: "📐",
      progress: 61,
      color: "#22c55e",
    },
    {
      name: "Science",
      icon: "🧪",
      progress: 48,
      color: "#f97316",
    },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1>Subjects</h1>
      <p>Choose a subject to continue learning.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {subjects.map((subject) => (
          <div
            key={subject.name}
            onClick={() => {
              if (subject.name === "Physics") {
                navigate("/chapters");
              }
            }}
            style={{
              padding: "25px",
              borderRadius: "15px",
              backgroundColor: "white",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              cursor: subject.name === "Physics" ? "pointer" : "default",
            }}
          >
            <div style={{ fontSize: "40px" }}>{subject.icon}</div>

            <h2>{subject.name}</h2>

            <p>{subject.progress}% completed</p>

            <div
              style={{
                height: "8px",
                backgroundColor: "#e5e7eb",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: `${subject.progress}%`,
                  height: "100%",
                  backgroundColor: subject.color,
                  borderRadius: "10px",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subjects;

