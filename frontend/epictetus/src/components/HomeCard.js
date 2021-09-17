import React, {useEffect, useRef, useState} from 'react'
import { Check } from 'react-feather'

export default function HomeCard({ src, text, id, }) {
    const [Selected, setSelected] = useState(false)

    const toggleSelect = ()=>{
        setSelected(!Selected)
    }

    //to ensure the component loads first before the check is done
    const didMountRef= useRef(false)
    useEffect(() => {
        if(!didMountRef.current){
            if(id==="Others"&& Selected===true){
                document.getElementById("others-input").style.display= "block";
                document.getElementById("others-line").style.display= "block"
            } 
            else{
                document.getElementById("others-input").style.display= "none";
                document.getElementById("others-line").style.display= "none"
            }
        }
    })

    

    return (
        <div className={`homeCard relative border ${Selected ? " border-primary" : "border-gray-500"} `} onClick={toggleSelect} id={id}>
            <img src={src} alt="job-roles" className="block mx-auto" />
            <p className="text-sm text-center">{text}</p>
            <Check size="20px" className={`absolute top-3 right-3 ${Selected ? "": "hidden"} text-primary border-2 border-primary rounded-full `}/>
        </div>
    )
}
