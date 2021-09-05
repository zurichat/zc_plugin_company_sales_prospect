
import React from 'react'
import "../App.css";
import "../index.css"

export default function DeleteProspect() {
    return (
        <div className="bg-white w-3/12 p-4 border-2 ml-4">
            <div className="flex">
                <div >
                <h3 class="font-medium mb=4 mt-4">Delete Prospect</h3>
                <p class="text-xs text-gray-400">This prospect will be deleted,this action cannot be undone</p>
                </div>
                <div class="mt-4">
                    <svg width="16" height="16" viewBox="0  16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 1L1 15" stroke="#2B2B2B" stroke-width="2" stroke-linecap="round" />
                        <path d="M1 1L15 15" stroke="#2B2B2B" stroke-width="2" stroke-linecap="round" />
                    </svg>
                </div>
            </div>


                <div class="mt-6">
                    <h3 class="font-medium">Name</h3>
                <div class="box-border h-10 w-25 p-2 border-2 border-gray-400 mt-2 text-sm">Delete Wilson</div>
                </div>
                <div class="mt-6">
                    <h3 class="font-medium">Email</h3>
                <div class="box-border h-10 w-25 p-2 border-2  border-gray-400 mt-2 text-sm">dolores.chamber@example.com</div>
                </div>
                <div class="mt-6">
                    <h3 class="font-medium">Phone Number</h3>
                <div class="box-border h-10 w-25 p-2 border-2 border-gray-400 mt-2 text-sm">(222) 555-0112</div>
                </div>
                <div class="mt-6">
                    <h3 class="font-medium">Deal Stage</h3>
                <div class="box-border h-10 w-25 p-2 border-2 border-gray-400 mt-2 text-sm">Negotiation</div>
                </div>
                <div class="flex-right mt-10 justify-between ml-20">
                    <button className="border-2 border-white text-green-400 rounded mt-2 mr-2">No,keep</button>
                    <button className="bg-red-600 text-white rounded mb-4 p-2">Yes, Delete</button>
                </div>
        </div>
   
    
    )
}

