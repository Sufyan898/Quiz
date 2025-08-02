// AdminPages/McqForm.jsx
import React, { useState } from 'react';


function McqForm({ addMcq }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [subject, setSubject] = useState('');

  const handleChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mcq = { question, options, correctAnswer, subject };
    addMcq(mcq);
    setQuestion('');
    setOptions(['', '', '', '']);
    setCorrectAnswer('');
    // setSubject('');
  };

  return (

    <form onSubmit={handleSubmit} className="p-4 border rounded bg-light shadow-sm">
      <h4>Add MCQ</h4>
      <div className="mb-2">
        <label>Subject:</label>
        <select className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} required>
          <option value="">Select Subject</option>
          <option value="React">React</option>
          <option value="Node">Node</option>
          <option value="Express">Express</option>
          <option value="MongoDB">MongoDB</option>
        </select>
      </div>
      <div className="mb-2">
        <label>Question:</label>
        <input type="text" className="form-control" value={question} onChange={(e) => setQuestion(e.target.value)} required />
      </div>
      {options.map((opt, i) => (
        <div key={i} className="mb-2">
          <label>Option {i + 1}:</label>
          <input type="text" className="form-control" value={opt} onChange={(e) => handleChange(i, e.target.value)} required />
        </div>
      ))}
      <div className="mb-2">
        <label>Correct Answer:</label>
        <input type="text" className="form-control" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-outline-success">Add MCQ</button>
      </div>
    </form>
  );
}

export default McqForm;
