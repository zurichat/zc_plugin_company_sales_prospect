import React from 'react'
import avatar from "../avatar.svg";
import { FileText, MoreVertical } from "react-feather";

function DealCard({ key, draggableId, index }) {
    return (
        <div className="h-36 my-2 mx-4 text-left text-sm border cursor-pointer border-gray-400 p-2">
            <div className="flex justify-between items-center">
                <div className="flex">
                    <FileText className="w-8 mr-4" strokeWidth={1} />
                    <span className="font-bold text-lg">Frank's deal </span>
                </div>
                <MoreVertical className="text-gray-600" strokeWidth={1} />
            </div>
            <div className="flex items-end">
                <img src={avatar} alt="avatar" className="w-8 mr-4" />
                <span className="mt-2">
                    <p>NNPC</p>
                    <p className="mb-2">$ 500, 000</p>
                    <p>frank.dnar@nnpc.com</p>
                    <p>Frank Dnar</p>
                </span>
            </div>
        </div>
    )
}



// import { Draggable } from 'react-beautiful-dnd';
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
export default DealCard
