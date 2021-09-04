import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

function App() {

  const submit = () => {

    confirmAlert({
      title: 'Delete  Deaal',
      message: 'This Deal will be Deleted. this action cannot be undone.',
      buttons: [
        {
          label: 'No, keep ',
          onClick: () => alert('Click No, keep')
        },
        {
          label: 'Yes, Delete',
          onClick: () => alert('Click Yes, Delete')
        }
      ]
    });
  }

  return (
      <div className='container'>
        <button onClick={submit}>Delete Deal</button>
      </div>
  );

}

export default App; 