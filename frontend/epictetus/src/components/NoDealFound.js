import React from 'react'
import   FileIcon from "./svg/FileIcon"

function NoDealFound() {
    return (
        <div>
            <button className="w-sm m-6 bg-green-400 p-3 text-white rounded-sm border-green-400 md:block">Create Prospect</button>
            <div className= "flex w-100 items-center justify-center flex-col text-center">
               <FileIcon/>
                <p className ="max-w-sm py-3 flex-wrap text-gray-400">Oops! no prospect has been added, create new prospect to view prospect here </p>
            </div>
        </div>
    )
}

export default NoDealFound
