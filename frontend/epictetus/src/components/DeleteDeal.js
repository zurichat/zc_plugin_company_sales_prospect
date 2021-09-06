import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import DeleteDealForm from './DeleteDealForm';

// function DeleteDeal() {

//   const submit = () => {

    confirmAlert({
      title: 'Delete  Deal',
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
        <DeleteDealForm/>
      </div>
  );

// }

// export default DeleteDeal; 