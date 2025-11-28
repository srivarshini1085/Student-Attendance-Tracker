// src/App.js (Full file content)

import React, { useReducer } from 'react';

// --- Initial State and Reducer (From Section 2) ---

const initialStudents = [
  { id: 1, name: 'Alice', isPresent: true },
  { id: 2, name: 'Bob', isPresent: true },
  { id: 3, name: 'Charlie', isPresent: false },
  { id: 4, name: 'David', isPresent: false },
];

function attendanceReducer(state, action) {
  switch (action.type) {
    case 'MARK_PRESENT':
      return state.map(student =>
        student.id === action.payload.id ? { ...student, isPresent: true } : student
      );

    case 'MARK_ABSENT':
      return state.map(student =>
        student.id === action.payload.id ? { ...student, isPresent: false } : student
      );

    case 'RESET':
      return initialStudents.map(student => ({ ...student, isPresent: false })); // Reset all to absent

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

// --- App Component ---

function App() {
  const [students, dispatch] = useReducer(attendanceReducer, initialStudents);

  // Helper function to dispatch actions
  const handleAction = (id, type) => {
    dispatch({ type, payload: { id } });
  };

  // Dispatch RESET action
  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🧑‍🎓 Student Attendance Tracker (using useReducer)</h1>
      <hr />

      <button onClick={handleReset} style={{ padding: '10px 20px', marginBottom: '20px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}>
        **RESET All Attendance**
      </button>

      <h2>Attendance List</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Status</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{student.id}</td>
              <td style={tableCellStyle}>**{student.name}**</td>
              <td style={{ ...tableCellStyle, color: student.isPresent ? 'green' : 'red', fontWeight: 'bold' }}>
                {student.isPresent ? 'PRESENT' : 'ABSENT'}
              </td>
              <td style={tableCellStyle}>
                <button
                  onClick={() => handleAction(student.id, 'MARK_PRESENT')}
                  disabled={student.isPresent}
                  style={presentButtonStyle}
                >
                  MARK PRESENT
                </button>
                <button
                  onClick={() => handleAction(student.id, 'MARK_ABSENT')}
                  disabled={!student.isPresent}
                  style={absentButtonStyle}
                >
                  MARK ABSENT
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;

// --- Basic Styling for the Table (Optional) ---
const tableHeaderStyle = {
  border: '1px solid #ddd',
  padding: '12px',
  textAlign: 'left',
};

const tableCellStyle = {
  border: '1px solid #ddd',
  padding: '12px',
};

const tableRowStyle = {
  ':nth-child(even)': {
    backgroundColor: '#f9f9f9',
  },
};

const presentButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '8px 16px',
    marginRight: '10px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px'
};

const absentButtonStyle = {
    backgroundColor: '#008CBA',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px'
};