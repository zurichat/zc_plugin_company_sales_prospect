import React from 'react'
import Cancel from './svg/Cancel'

const EditProspectSales = () => {
    return (
        <form>
            <div>
                <h1>Edit</h1>
                <Cancel />
            </div>
            <h5>Edit deal information</h5>
            <label>
                Name
                <input type="text" placeholder='Jane Cooper' />
            </label>
            <label>
                Company
                <input type="text" placeholder='NNPC' />
            </label>
            <label>
                Deal Stage
                <select>
                    <option value="Done">Done</option>
                    <option value="Unfinished">Unfinished</option>
                    <option selected value="Negotiation">Negotiation</option>
                </select>
            </label>
            <label>
                Amount
                <input type="text" placeholder='$500,000' />
            </label>
            <input type='submit' />
        </form>
    )
}

export default EditProspectSales
