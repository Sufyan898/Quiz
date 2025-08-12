import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Styling/Quiz.module.css";

const allMcqs = {
  ReactJS: [
    { question: "Which company created ReactJS?", options: ["Google", "Facebook", "Apple", "Microsoft"], correctAnswer: "Facebook" },
    { question: "Which hook is used for state in React?", options: ["useEffect", "useState", "useContext", "useReducer"], correctAnswer: "useState" },
    { question: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax eXtension", "JavaScript eXtension", "Java Syntax"], correctAnswer: "JavaScript XML" },
    { question: "How do you pass data from parent to child component?", options: ["State", "Props", "Hooks", "Context"], correctAnswer: "Props" },
    { question: "Which lifecycle method runs after component mounts?", options: ["componentDidMount", "componentWillUnmount", "render", "componentDidUpdate"], correctAnswer: "componentDidMount" },
    { question: "What is the purpose of keys in React lists?", options: ["Identify elements uniquely", "Style elements", "Add events", "Track state"], correctAnswer: "Identify elements uniquely" },
    { question: "Which hook is used for side effects?", options: ["useEffect", "useState", "useReducer", "useMemo"], correctAnswer: "useEffect" },
    { question: "How do you create a controlled component?", options: ["Using refs", "Using state to manage input", "Using defaultValue", "Using useEffect"], correctAnswer: "Using state to manage input" },
    { question: "What is 'lifting state up'?", options: ["Moving state to parent component", "Removing state", "Passing state as props", "Using Redux"], correctAnswer: "Moving state to parent component" },
    { question: "Which hook is used to optimize expensive calculations?", options: ["useMemo", "useCallback", "useEffect", "useState"], correctAnswer: "useMemo" }
  ],

  MongoDB: [
    { question: "What type of database is MongoDB?", options: ["Relational", "Document-oriented", "Graph", "Key-value"], correctAnswer: "Document-oriented" },
    { question: "Which command is used to insert data in MongoDB?", options: ["insert()", "add()", "put()", "save()"], correctAnswer: "insert()" },
    { question: "MongoDB stores data in what format?", options: ["Tables", "JSON-like documents", "XML files", "CSV"], correctAnswer: "JSON-like documents" },
    { question: "Which query is used to find documents?", options: ["find()", "search()", "lookup()", "get()"], correctAnswer: "find()" },
    { question: "What is the default port for MongoDB?", options: ["27017", "3306", "5432", "1521"], correctAnswer: "27017" },
    { question: "Which operator is used for 'not equal' in MongoDB?", options: ["$neq", "$ne", "$not", "$neqt"], correctAnswer: "$ne" },
    { question: "Which command deletes a collection?", options: ["db.collection.drop()", "db.collection.delete()", "db.dropCollection()", "db.collection.remove()"], correctAnswer: "db.collection.drop()" },
    { question: "Which command updates a single document?", options: ["updateOne()", "update()", "modifyOne()", "changeOne()"], correctAnswer: "updateOne()" },
    { question: "What does replica set provide?", options: ["Sharding", "Replication", "Indexing", "Aggregation"], correctAnswer: "Replication" },
    { question: "What is the aggregation framework used for?", options: ["Data transformation", "Data storage", "Authentication", "Backup"], correctAnswer: "Data transformation" }
  ],

  ExpressJS: [
    { question: "ExpressJS is a framework for which language?", options: ["Python", "Java", "JavaScript", "C#"], correctAnswer: "JavaScript" },
    { question: "Which middleware parses JSON in Express?", options: ["bodyParser.json()", "express.json()", "jsonParser()", "parseJSON()"], correctAnswer: "express.json()" },
    { question: "How do you define a route for GET method in Express?", options: ["app.get()", "app.post()", "app.route()", "app.fetch()"], correctAnswer: "app.get()" },
    { question: "Which method is used to send a response?", options: ["res.send()", "res.write()", "res.json()", "Both A and C"], correctAnswer: "Both A and C" },
    { question: "How to handle 404 errors in Express?", options: ["app.use middleware", "res.status(404)", "app.get('/404')", "app.error()"], correctAnswer: "app.use middleware" },
    { question: "Which package is commonly used for routing in Express?", options: ["express-router", "express-route", "express.Router", "router-express"], correctAnswer: "express.Router" },
    { question: "What is middleware in Express?", options: ["Functions with access to req/res", "Routing library", "Database handler", "Error logger"], correctAnswer: "Functions with access to req/res" },
    { question: "How to start an Express server?", options: ["app.listen()", "server.start()", "express.run()", "node app.js"], correctAnswer: "app.listen()" },
    { question: "Which HTTP method is NOT supported by Express routing?", options: ["GET", "POST", "UPDATE", "DELETE"], correctAnswer: "UPDATE" },
    { question: "How to parse URL-encoded data in Express?", options: ["express.urlencoded()", "bodyParser.urlencoded()", "express.parse()", "urlencoded()"], correctAnswer: "express.urlencoded()" }
  ],

  NodeJS: [
    { question: "NodeJS is built on which JavaScript engine?", options: ["V8", "SpiderMonkey", "Chakra", "JavaScriptCore"], correctAnswer: "V8" },
    { question: "Which module is used to create a server in NodeJS?", options: ["http", "fs", "net", "url"], correctAnswer: "http" },
    { question: "Which method reads a file asynchronously?", options: ["fs.readFile()", "fs.readFileSync()", "fs.open()", "fs.createReadStream()"], correctAnswer: "fs.readFile()" },
    { question: "Which of these is NOT a NodeJS core module?", options: ["express", "fs", "http", "path"], correctAnswer: "express" },
    { question: "How do you export a module in NodeJS?", options: ["module.exports", "exports.module", "export default", "export module"], correctAnswer: "module.exports" },
    { question: "Which function is used to schedule a callback after a delay?", options: ["setTimeout()", "setInterval()", "process.nextTick()", "setImmediate()"], correctAnswer: "setTimeout()" },
    { question: "What does npm stand for?", options: ["Node Package Manager", "New Package Manager", "Node Program Manager", "Native Package Manager"], correctAnswer: "Node Package Manager" },
    { question: "Which command installs packages from package.json?", options: ["npm install", "npm init", "npm start", "npm run"], correctAnswer: "npm install" },
    { question: "Which object provides information about the current process?", options: ["process", "global", "module", "__dirname"], correctAnswer: "process" },
    { question: "Which module helps to work with file and directory paths?", options: ["path", "fs", "http", "url"], correctAnswer: "path" }
  ]
};

function Quiz() {
  const { subject: initialSubject } = useParams();
  const navigate = useNavigate();

  const [subject, setSubject] = useState(initialSubject);
  const quizQuestions = allMcqs[subject] || [];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [showChangeQuiz, setShowChangeQuiz] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [userAnswers, setUserAnswers] = useState(Array(quizQuestions.length).fill(null));

  if (!quizQuestions.length) {
    return <div className={styles.quizApp}><h2>Sorry, no quiz found for "{subject}"</h2></div>;
  }

  const handleAnswer = () => {
    // Save answer
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = selectedOption;
    setUserAnswers(updatedAnswers);

    // Update score if correct
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption("");
    } else {
      setShowScore(true);
      setShowChangeQuiz(false);
      setShowReview(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption("");
    setShowChangeQuiz(false);
    setShowReview(false);
    setUserAnswers(Array(quizQuestions.length).fill(null));
  };

  const handleChangeQuizClick = () => {
    setShowChangeQuiz(true);
    setShowReview(false);
  };

  const handleReviewClick = () => {
    setShowReview(true);
    setShowChangeQuiz(false);
    setShowScore(false);
  };

  const handleSubjectChange = (e) => {
    const newSubject = e.target.value;
    setSubject(newSubject);
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption("");
    setShowChangeQuiz(false);
    setShowReview(false);
    setUserAnswers(Array(allMcqs[newSubject]?.length || 0).fill(null));
    navigate(`/quiz/${newSubject}`, { replace: true });
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.quizApp}>
      {showScore && (
        <div>
          <h2>Your Score: {score} / {quizQuestions.length}</h2>

          <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">
            <button className="btn btn-outline-light" onClick={restartQuiz}>Restart Quiz</button>
            <button className="btn btn-outline-light" onClick={handleChangeQuizClick}>Change Quiz</button>
            <button className="btn btn-outline-light" onClick={handleBackHome}>Back to Home</button>
            <button className="btn btn-outline-light" onClick={handleReviewClick}>Review Answers</button>
          </div>

          {showChangeQuiz && (
            <select value={subject} onChange={handleSubjectChange} className="form-select mt-3 text-dark" style={{ maxWidth: "200px", margin: "0 auto" }}>
              <option value="ReactJS">ReactJS</option>
              <option value="MongoDB">MongoDB</option>
              <option value="ExpressJS">ExpressJS</option>
              <option value="NodeJS">NodeJS</option>
            </select>
          )}
        </div>
      )}

      {showReview && (
        <div>
          <h2>Review Your Answers - {subject} Quiz</h2>
          {quizQuestions.map((q, idx) => (
            <div key={idx} className={styles.reviewQuestion}>
              <p><strong>Q{idx + 1}:</strong> {q.question}</p>
              <p>Your answer: <span style={{ color: userAnswers[idx] === q.correctAnswer ? '#4caf50' : '#e53935' }}>{userAnswers[idx] || "No answer selected"}</span></p>
              <p>Correct answer: <strong>{q.correctAnswer}</strong></p>
            </div>
          ))}

          <div className="d-flex flex-wrap justify-content-between gap-2 mt-3">
            <button className="btn btn-outline-light" onClick={restartQuiz}>Restart Quiz</button>
            <button className="btn btn-outline-light" onClick={handleChangeQuizClick}>Change Quiz</button>
            <button className="btn btn-outline-light" onClick={handleBackHome}>Back to Home</button>
          </div>
        </div>
      )}

      {!showScore && !showReview && (
        <div className={styles.questionSection}>
          <h2>{subject} Quiz</h2>
          <h3>Question {currentQuestion + 1}/{quizQuestions.length}</h3>
          <p>{quizQuestions[currentQuestion].question}</p>

          <div className={styles.options}>
            {quizQuestions[currentQuestion].options.map((option, index) => (
              <div key={index} className={styles.option} onClick={() => setSelectedOption(option)}>
                <input type="radio" id={`option-${index}`} name="option" value={option} checked={selectedOption === option} onChange={() => {}} />
                <label htmlFor={`option-${index}`}>{option}</label>
              </div>
            ))}
          </div>

          <button className="btn btn-lg btn-outline-light mt-3" onClick={handleAnswer} disabled={!selectedOption}> 
            {currentQuestion === quizQuestions.length - 1 ? "Finish" : "Next Question"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Quiz;
