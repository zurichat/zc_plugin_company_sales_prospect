import React, {useState} from 'react'
import Button from './Button';
import CreateProspectModal from './Modal'
import   FileIcon from "./svg/FileIcon";


function NoProspectsFound() {
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => setOpen(true)
    const handleCloseModal = () => setOpen(false)
    return (
        <div className="p-10">
            <Button onClick={handleOpenModal}>Create Prospect</Button>
            <CreateProspectModal open={open} closeModal={handleCloseModal}/>            
            <div className= "flex w-100 items-center justify-center flex-col text-center pt-32">
               <FileIcon/>
                <p className ="max-w-sm py-3 flex-wrap text-gray-400">Oops! no prospect has been added, create new prospect to view prospect here </p>
            </div>
        </div>
    )
}

export default NoProspectsFound;
