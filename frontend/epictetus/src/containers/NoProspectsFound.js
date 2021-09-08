import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import CreateProspectModal from '../components/Modal'
import FileIcon from "../components/svg/FileIcon";


function NoProspectsFound() {
    const [open, setOpen] = useState(false)
    const handleOpenModal = () => setOpen(true)
    const handleCloseModal = () => setOpen(false)
    return (
        <div className="p-10">
            <Button onClick={handleOpenModal}>Create Prospect</Button>
            <CreateProspectModal open={open} closeModal={handleCloseModal} />
            <div className="flex w-100 items-center justify-center flex-col text-center pt-32">
                <FileIcon />
                <p className="max-w-sm py-3 flex-wrap text-gray-400">
                    Oops! no prospect has been added, create new prospect to view prospect here.
                </p>
                <div className="text-primary">
                    <Link to="/test">Test | </Link>{' '}
                    <Link to="/prospects">Prospects | </Link>{' '}
                    <Link to="/deals">Deals</Link>
                </div>
            </div>
        </div>
    )
}

export default NoProspectsFound;
