import React from 'react'
import '../App.css';

export default function Home() {
    return (
        <div className="app">
            <h1 className="text-4xl font-bold">Company Sales Prospect</h1>
            <button 
                onClick={()=>window.alert("Welcome to Company Sales Prospect, Tailwind successfully configured.")}
                className="mt-5 py-3 px-5 rounded-md text-white bg-green-500 border-none">
                Welcome
            </button>
        </div>
    )
}
