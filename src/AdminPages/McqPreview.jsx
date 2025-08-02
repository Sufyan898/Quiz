// AdminPages/McqPreviewTable.jsx
import React from 'react';

function McqPreviewTable({ mcqs, deleteMcq }) {
  return (
    
    <div className="mt-4">
      <h4>Preview MCQs</h4>
      {mcqs.length === 0 ? <p>No MCQs added yet.</p> : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Question</th>
              <th>Correct Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {mcqs.map((mcq, index) => (
              <tr key={index}>
                <td>{mcq.subject}</td>
                <td>{mcq.question}</td>
                <td>{mcq.correctAnswer}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteMcq(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default McqPreviewTable;
