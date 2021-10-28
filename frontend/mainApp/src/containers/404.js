import React from 'react'
import { Frown } from 'react-feather'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div className="mt-4">
            <div className="flex w-100 items-center justify-center flex-col text-center pt-32">
                <div className="shadow-lg w-96 justify-center flex p-10 flex-col items-center">
                    <Frown className="w-48 h-32 text-gray-300"/>
                    <p className="font-bold text-xl mt-5">
                        This page could not be found
                    </p>
                    <p className="max-w-sm py-3 flex-wrap text-sm">
                        Go back to <Link to="/" className="text-green hover:text-green"> contacts list</Link> or  <Link to="/deals/" className="text-green hover:text-green"> deals list</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}
