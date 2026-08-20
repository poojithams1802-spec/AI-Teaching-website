function Dashboard() {
  return (
    <div className="dashboard">
      <h1>EduAI Dashboard 🎓</h1>

      <div className="progress-section">
        <h2>Overall Progress: 68%</h2>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
      </div>

      <div className="subject-grid">
        <div className="subject-card">
          <h2>📐 Mathematics</h2>
          <p>61% completed</p>
        </div>

        <div className="subject-card">
          <h2>⚛️ Physics</h2>
          <p>72% completed</p>
        </div>

        <div className="subject-card">
          <h2>🧪 Science</h2>
          <p>48% completed</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
