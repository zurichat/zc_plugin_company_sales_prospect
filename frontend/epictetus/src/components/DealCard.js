import React from "react";
import avatar from "../avatar.svg";
import { FileText, MoreVertical } from "react-feather";
import { Draggable } from "react-beautiful-dnd";

const DealCard = ({ data }) => {
  const items = [
    {
      id: "head 88",
      name: "Crystal",
      company: "Nigerian Brewery",
      amount: "6700000",
      email: "youcametowatch.@get.com",
      category: "prospects",
    },
    {
      id: "neck 88",
      name: "Youhan",
      company: "NNPC",
      amount: "1B",
      email: "youcametowatch.@get.com",
      category: "proposal",
    },
    {
      id: "k7",
      name: "Frranks",
      email: "youcametowatch.@get.com",
      company: "JONSON'S INC",
      amount: "500,000",
      category: "negotiation",
    },
    {
      id: "Ne 42",
      name: "Naza",
      email: "youcametowatch.@get.com",
      company: "JBc LTD",
      amount: "594540,000",
      category: "negotiation",
    },
    {
      id: "men 3",
      name: "Klly",
      email: "youcametowatch.@get.com",
      company: "Thytt trbi",
      amount: "10,000",
      category: "closed",
    },
  ];

  return (
    <>
      {items.map((item, index) => {
        const { id, name, company, amount, email, category } = item;

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
                    className="h-36 my-2 mx-4 text-left text-sm border shadow cursor-pointer border-gray-300 rounded p-2"
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
