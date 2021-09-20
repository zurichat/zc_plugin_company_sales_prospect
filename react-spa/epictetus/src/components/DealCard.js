import React, {useContext, useState} from "react";
import avatar from "../avatar.svg";
import {FileText} from "react-feather";
import {Draggable} from "react-beautiful-dnd";
import EditDeals from "./EditDeals";
import DealsOptions from "./DealOptions";
import {DealsContext} from "../context/Deal/DealContext";

const DealCard = ({data}) => {
    const items = [
        {
            id: "88",
            name: "Crystal",
            company: "Nigerian Brewery",
            amount: "6700000",
            email: "youcametowatch.@get.com",
            category: "prospects",
        },
        {
            id: "80",
            name: "Youhan",
            company: "NNPC",
            amount: "1B",
            email: "youcametowatch.@get.com",
            category: "proposal",
        },
        {
            id: "7",
            name: "Frranks",
            email: "youcametowatch.@get.com",
            company: "JONSON'S INC",
            amount: "500,000",
            category: "negotiation",
        },
        {
            id: "42",
            name: "Naza",
            email: "youcametowatch.@get.com",
            company: "JBc LTD",
            amount: "594540,000",
            category: "negotiation",
        },
        {
            id: "3",
            name: "Klly",
            email: "youcametowatch.@get.com",
            company: "Thytt trbi",
            amount: "10,000",
            category: "closed",
        },
    ];


    const {deals} = useContext(DealsContext)

    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpen(true);

    const [open2, setOpen2] = useState(false);
    const handleOpenModal2 = () => setOpen2(true);

    const handleCloseModal = () => {
        setOpen(false);
        setOpen2(false);
    };

    let {category} = items;

    let borderColor = "";

    if (category === "prospects") {
        borderColor = "yellow-300";
    } else if (category === "proposal") {
        borderColor = "red-300";
    } else if (category === "negotiation") {
        borderColor = "indigo-300";
    } else if (category === "closed") {
        borderColor = "green-300";
    }

    return (
        <>
            {deals.map((item, index) => {
                const {id, name, company, amount, email, category} = item;

                if (data === category) {
                    return (
                        <Draggable key={id} draggableId={id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <div
                                        key={id}
                                        className={`w-64 h-44 bg-white shadow-lg px-4 py-2 flex flex-col gap-3 border-t-2  border-${borderColor} rounded`}
                                    >
                                        {/* Edit Deals */}
                                        <EditDeals
                                            open={open}
                                            handleCloseModal={handleCloseModal}
                                            id={id}
                                            name={name}
                                            amount={amount}
                                            category={category}
                                            email={email}
                                            company={company}
                                            items={items}
                                        />
                                        <div className="flex justify-between items-center">
                                            <div className="flex">
                                                <FileText className="w-8 mr-4" strokeWidth={1}/>
                                                <span className="font-bold text-lg">{name} deal </span>
                                            </div>
                                            <DealsOptions
                                                handleOpenModal={handleOpenModal}
                                                handleCloseModal={handleCloseModal}
                                                handleOpenDeleteModal={handleOpenModal2}
                                                handleCloseDeleteModal={handleCloseModal}
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="mt-2">
                        <p>{company}</p>
                        <p className="mb-2 text-green-500 font-bold">${amount}</p>
                        <p>{email} </p>
                        <p>{name}</p>
                      </span>
                                        </div>
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )}
                        </Draggable>
                    );
                } else {
                    return [];
                }
            })}
        </>
    );
};

//;
// function DealCard({ key, draggableId, index }) {
//     return (
//         <Draggable key={key} draggableId={draggableId} index={index}>
//             {(provided) => (
//                 <div className="h-36 my-2 mx-4 text-left text-sm border cursor-pointer border-gray-400 p-2"
//                     ref={provided.innerRef}
//                     {...provided.draggableProps}
//                     {...provided.dragHandleProps}>
//                     <div className="flex justify-between items-center">
//                         <div className="flex">
//                             <FileText className="w-8 mr-4" strokeWidth={1} />
//                             <span className="font-bold text-lg">Frank's deal </span>
//                         </div>
//                         <MoreVertical className="text-gray-600" strokeWidth={1} />
//                     </div>
//                     <div className="flex items-end">
//                         <img src={avatar} alt="avatar" className="w-8 mr-4" />
//                         <span className="mt-2">
//                             <p>NNPC</p>
//                             <p className="mb-2">$ 500, 000</p>
//                             <p>frank.dnar@nnpc.com</p>
//                             <p>Frank Dnar</p>
//                         </span>
//                     </div>
//                 </div>
//             )}

//         </Draggable>
//     )
// }
export default DealCard;
