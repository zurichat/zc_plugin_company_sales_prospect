import React from "react";
import avatar from "../avatar.svg";
import { FileText, MoreVertical } from "react-feather";

const DealCard = ({
  data,
  name,
  company,
  dealStage,
  amount,
  key,
  draggableId,
  index,
}) => {
  const items = [
    {
      id: 1,
      name: "",
      company: "",
      amount: "",
      email: "",
      category: "prospect",
    },
    {
      id: 2,
      name: "",
      company: "",
      amount: "",
      email: "",
      category: "proposal",
    },
    {
      id: 3,
      name: "",
      email: "",
      company: "",
      amount: "",
      category: "negotiation",
    },
    {
      id: 4,
      name: "",
      email: "",
      company: "",
      amount: "",
      category: "closed",
    },
    {
      id: 5,
      name: "",
      email: "",
      company: "",
      amount: "",
      category: "closed",
    },
  ];
   

  return (
    <>
      {items.map((item) => {
        const { id, name, company, amount, email, category } = item;

        
          return (
            <div
              key={id}
              className="h-36 my-2 mx-4 text-left text-sm border cursor-pointer border-gray-300 rounded p-2"
            >
              <div className="flex justify-between items-center">
                <div className="flex">
                  <FileText className="w-8 mr-4" strokeWidth={1} />
                  <span className="font-bold text-lg">{name} deal </span>
                </div>
                <MoreVertical className="text-gray-600" strokeWidth={1} />
              </div>
              <div className="flex items-end">
                <img src={avatar} alt="avatar" className="w-8 mr-4" />
                <span className="mt-2">
                  <p>{company}</p>
                  <p className="mb-2">${amount}</p>
                  <p>{email} </p>
                  <p>{name}</p>
                </span>
              </div>
            </div>
          );
        
      })}
    </>
  );
};

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
export default DealCard;
