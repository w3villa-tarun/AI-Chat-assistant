import axios from "axios";
import "./App.css";
import { useState } from "react";

function App() {
  // Styles
  const wrapper = {
    maxWidth: "600px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f7f7f7",
    borderRadius: "10px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)"
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px"
  };

  const textAreaStyle = {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    marginBottom: "20px",
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    marginBottom: "20px",
    transition: "background-color 0.3s"
  };

  const answerContainer = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid #007BFF",
    padding: "15px",
    borderRadius: "5px",
    backgroundColor: "#fff",
  };

  const answerRow = {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#e9ecef",
    padding: "10px",
    borderRadius: "5px",
  };

  const preStyle = {
    margin: "0",
    fontSize: "16px",
    fontFamily: "monospace",
    whiteSpace: "break-spaces"
  };

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    setAnswer("loading...");

    const response = await axios({
      url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAcviGBxO8U2PWPl94j4EPEFotTC0DKic0",
      method: "post",
      data: {
        contents: [
          {
            parts: [
              {
                text: question
              }
            ]
          }
        ]
      }
    });

    setAnswer(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
  }

  return (
    <div style={wrapper}>
      <h1 style={headingStyle}>AI Chat Agent</h1>
      <textarea
        style={textAreaStyle}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask any Question with AI"
      ></textarea>
      <button style={buttonStyle} onClick={generateAnswer}>
        Generate Answer
      </button>

      <p><b>Answer:</b></p>

      <div style={answerContainer}>
        <div style={answerRow}>
          <pre style={preStyle}>{answer}</pre>
        </div>
      </div>
    </div>
  );
}

export default App;
