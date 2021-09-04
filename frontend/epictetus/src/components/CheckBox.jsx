import React from 'react'

export default function CheckBox({name, label}) {
    return (
        
            <label class="items-center mt-3 text-center ">
                
                <input type="checkbox" 
                        name={name}
                        className="form-checkbox  
                            text-primary 
                            border-primary
                            h-18 w-18
                            focus:ring-0 focus:ring-offset-0 ml-10"
                            onChange = {() => alert("checked!")}
                />
                
                <span class="ml-2 text-primary">{label}</span>
            
            </label>

     )
}


