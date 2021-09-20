import React from 'react'
import Swal from 'sweetalert2';
import Modal from '../components/Modal'

const successCard = () => {

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
    return (
        <div>
            <Swal/>
        </div>
    )
}

export default successCard
