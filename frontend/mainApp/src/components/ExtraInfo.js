import React from 'react'
import {Trash2, Edit} from 'react-feather'

function ExtraInfo ({fieldLabel, fieldValue, checkAddedInfo}) {
    return (
        <div onClick = {() => {checkAddedInfo(fieldLabel, fieldValue)}} className="flex-col p-1 w-full">
        <div className="flex w-full justify-between h-5">
             {fieldLabel}:
             <div className=" flex justify-around w-10">
                 <button className="border-0">
             <Edit
				className="h-4/5"
				strokeWidth={1}
			    />
            </button>
            <button className="border-0">          
			<Trash2
				className="h-4/5"
				strokeWidth={1}
			/>
            </button>
            </div>	       	    
        </div>
            <div className=" bg-gray-300 h-5">{fieldValue}</div>
        </div>
    )
}

export default ExtraInfo;

