import React from 'react'
import { Check } from 'react-feather';
import "../App.css"

export default function HomeCard({ src, text, id,handleClick, register }) {

    return ( 
        <label onClick={handleClick}>
            <input type="radio" {...register("position")}  name="position" value={id}className="card-input-element hidden" id={id}/>

            <div className="homeCard relative border border-gray-500">
                <img src={src} alt="job-roles" className="block mx-auto" />
                <p className="text-sm text-center">{text}</p>
                <Check size="20px" className="homeCardCheck absolute top-3 right-3 text-green border-2 border-green rounded-full"/>
            </div>

        </label>
    )
}
