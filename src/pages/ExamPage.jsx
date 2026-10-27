import { useEffect, useState } from "react";

import "../App.css";

const sampleExams = [
  {
    id: 1,
    name: "Internal Assessment Test - 1",
    subject: "Database Management Systems",
    code: "CSE301",
    type: "Quiz",
    start: "26 Oct 2026, 09:00 AM",
    end: "26 Oct 2026, 11:00 AM",
    status: "Available",
    duration: 15,
    questions: [
      {
        question: "What is the primary purpose of a DBMS?",
        options: [
          "Designing websites",
          "Managing and organizing data",
          "Compiling programs",
          "Managing hardware",
        ],
        answer: 1,
      },
      {
        question: "Which key uniquely identifies a row in a relational table?",
        options: ["Foreign key", "Alternate key", "Primary key", "Secondary index"],
        answer: 2,
      },
      {
        question: "Which SQL command retrieves data?",
        options: ["SELECT", "UPDATE", "INSERT", "DELETE"],
        answer: 0,
      },
      {
        question: "What does SQL stand for?",
        options: [
          "Simple Question Language",
          "Structured Query Language",
          "System Query Logic",
          "Sequential Question Link",
        ],
        answer: 1,
      },
      {
        question: "Which normal form removes partial dependencies?",
        options: ["First Normal Form", "Second Normal Form", "Third Normal Form", "Fourth Normal Form"],
        answer: 1,
      },
    ],
  },
  {
    id: 2,
    name: "Operating Systems - Unit Test",
    subject: "Operating Systems",
    code: "CSE302",
    type: "Online Exam",
    start: "27 Oct 2026, 09:00 AM",
    end: "27 Oct 2026, 11:00 AM",
    status: "Upcoming",
    duration: 20,
    questions: [
      {
        question: "Which CPU scheduling algorithm uses a time quantum?",
        options: ["FCFS", "SJF", "Round Robin", "Priority Scheduling"],
        answer: 2,
      },
      {
        question: "Which is a necessary condition for deadlock?",
        options: ["Compilation", "Circular wait", "Paging", "Caching"],
        answer: 1,
      },
    ],
  },
  {
    id: 3,
    name: "Computer Networks - Practice Quiz",
    subject: "Computer Networks",
    code: "CSE303",
    type: "Quiz",
    start: "20 Oct 2026, 09:00 AM",
    end: "20 Oct 2026, 10:00 AM",
    status: "Completed",
    duration: 10,
    questions: [
      {
        question: "Which protocol provides reliable, connection-oriented transport?",
        options: ["UDP", "IP", "TCP", "ARP"],
        answer: 2,
      },
    ],
  },
  {
    id: 4,
    name: "Artificial Intelligence - Quiz 1",
    subject: "Artificial Intelligence",
    code: "CSE304",
    type: "Quiz",
    start: "28 Oct 2026, 09:00 AM",
    end: "28 Oct 2026, 11:00 AM",
    status: "Upcoming",
    duration: 15,
    questions: [
      {
        question: "Which algorithm is commonly used for heuristic pathfinding?",
        options: ["A*", "Bubble Sort", "Round Robin", "Linear Search"],
        answer: 0,
      },
    ],
  },
];

function ExamAttempt({ exam, onBack }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [marked, setMarked] = useState([]);
  const [secondsLeft, setSecondsLeft] = useState(exam.duration * 60);
  const [submitted, setSubmitted] = useState(false);
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  useEffect(() => {
    if (submitted) return;

    const timer = setInterval(() => {
      setSecondsLeft((remaining) => {
        if (remaining <= 1) {
          clearInterval(timer);
          setSubmitted(true);
          return 0;
        }
        return remaining - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [submitted]);

  const question = exam.questions[current];
  const answeredCount = Object.keys(answers).length;
  const score = exam.questions.reduce(
    (total, item, index) => total + (answers[index] === item.answer ? 1 : 0),
    0,
  );

  const time = `${String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:${String(secondsLeft % 60).padStart(2, "0")}`;

  if (submitted) {
    return (
      <section className="result-screen">
        <div className="result-check">✓</div>
        <h2>Exam Submitted Successfully</h2>
        <p>{exam.name}</p>
        <div className="result-score">
          {score} <span>/ {exam.questions.length}</span>
        </div>
        <p>
          Answered {answeredCount} of {exam.questions.length} questions.
        </p>
        <button className="primary-button" onClick={onBack}>
          Back to Quiz/Exams
        </button>
      </section>
    );
  }

  return (
    <section className="attempt-screen">
      <div className="attempt-heading">
        <div>
          <p className="muted">Quiz/Exams / Attempt Exam</p>
          <h2>{exam.name}</h2>
          <p>{exam.subject} ({exam.code})</p>
        </div>
        <div className={`exam-timer ${secondsLeft < 60 ? "timer-warning" : ""}`}>
          ◷ {time} remaining
        </div>
      </div>

      <div className="attempt-layout">
        <div className="question-card">
          <div className="question-card-heading">
            <strong>Question {current + 1} of {exam.questions.length}</strong>
            <span>{exam.type}</span>
          </div>

          <div className="question-text">{question.question}</div>

          <div className="answer-options">
            {question.options.map((option, index) => (
              <label
                key={option}
                className={`answer-option ${answers[current] === index ? "answer-selected" : ""}`}
              >
                <input
                  type="radio"
                  name={`question-${current}`}
                  checked={answers[current] === index}
                  onChange={() =>
                    setAnswers((old) => ({ ...old, [current]: index }))
                  }
                />
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </label>
            ))}
          </div>

          <div className="question-controls">
            <button
              className="secondary-button"
              disabled={current === 0}
              onClick={() => setCurrent(current - 1)}
            >
              ← Previous
            </button>

            <button
              className="secondary-button"
              onClick={() =>
                setMarked((old) =>
                  old.includes(current)
                    ? old.filter((item) => item !== current)
                    : [...old, current],
                )
              }
            >
              {marked.includes(current) ? "★ Marked for Review" : "☆ Mark for Review"}
            </button>

            {current < exam.questions.length - 1 ? (
              <button
                className="primary-button"
                onClick={() => setCurrent(current + 1)}
              >
                Next →
              </button>
            ) : (
              <button
                className="primary-button"
                onClick={() => setConfirmSubmit(true)}
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>

        <aside className="question-palette">
          <h3>Question Palette</h3>
          <div className="palette-grid">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                className={[
                  "palette-number",
                  current === index ? "palette-current" : "",
                  answers[index] !== undefined ? "palette-answered" : "",
                  marked.includes(index) ? "palette-marked" : "",
                ].join(" ")}
                onClick={() => setCurrent(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <div className="palette-legend">
            <span><i className="legend-dot answered-dot" /> Answered</span>
            <span><i className="legend-dot" /> Not answered</span>
            <span><i className="legend-dot marked-dot" /> Marked for review</span>
          </div>

          <hr />
          <p>Answered: <strong>{answeredCount}</strong></p>
          <p>Remaining: <strong>{exam.questions.length - answeredCount}</strong></p>
          <button className="submit-full" onClick={() => setConfirmSubmit(true)}>
            Submit Exam
          </button>
        </aside>
      </div>

      {confirmSubmit && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <h3>Submit your exam?</h3>
            <p>
              You have answered {answeredCount} of {exam.questions.length} questions.
              Are you sure you want to submit?
            </p>
            <div className="modal-actions">
              <button className="secondary-button" onClick={() => setConfirmSubmit(false)}>
                Continue Exam
              </button>
              <button
                className="primary-button"
                onClick={() => {
                  setConfirmSubmit(false);
                  setSubmitted(true);
                }}
              >
                Confirm Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


export default function ExamPage() {
  const [selectedExam, setSelectedExam] = useState(null);
  const [filter, setFilter] = useState("All");

  function openExam(exam) {
    if (exam.status === "Completed") return;

    if (exam.status === "Upcoming") {
      window.alert("This exam has not started yet.");
      return;
    }

    setSelectedExam(exam);
  }

  const filteredExams = sampleExams.filter(
    (exam) => filter === "All" || exam.status === filter,
  );

  if (selectedExam) {
    return (
      <div className="etlab-app exam-page">
        <ExamAttempt
          exam={selectedExam}
          onBack={() => setSelectedExam(null)}
        />
      </div>
    );
  }

  return (
    <div className="etlab-app exam-page">
      <main className="main-panel">
        <div className="content-area">
          <div className="table-title">
            <span className="document-icon">▰</span>
            <span>Quiz/Exams</span>
          </div>

          <div className="exam-filters">
            <span>Available Exams</span>
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              aria-label="Filter exams by status"
            >
              <option value="All">All Exams</option>
              <option value="Available">Available</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div className="table-scroll">
            <table className="exam-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Exam</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredExams.map((exam, index) => (
                  <tr key={exam.id}>
                    <td>{index + 1}</td>
                    <td>
                      <button
                        className="exam-link"
                        onClick={() => openExam(exam)}
                        disabled={exam.status === "Completed"}
                      >
                        {exam.name}
                      </button>
                    </td>
                    <td>
                      {exam.subject}
                      <small className="subject-code">{exam.code}</small>
                    </td>
                    <td>{exam.type}</td>
                    <td>{exam.start}</td>
                    <td>{exam.end}</td>
                    <td>
                      <button
                        className={`action-button ${
                          exam.status !== "Available" ? "action-disabled" : ""
                        }`}
                        onClick={() => openExam(exam)}
                        disabled={exam.status === "Completed"}
                      >
                        {exam.status === "Available"
                          ? "Start Exam"
                          : exam.status === "Upcoming"
                            ? "View"
                            : "Completed"}
                      </button>
                      <div
                        className={`status-label status-${exam.status.toLowerCase()}`}
                      >
                        {exam.status}
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredExams.length === 0 && (
                  <tr>
                    <td colSpan="7" className="empty-row">
                      No exams found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
