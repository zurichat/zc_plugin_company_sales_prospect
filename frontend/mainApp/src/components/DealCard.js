import React, { useEffect, useState } from "react";
import { Calendar } from "react-feather";
import { Draggable } from "react-beautiful-dnd";
import EditDeals from "./EditDeals";
import DealsOptions from "./DealOptions";

const DealCard = ({ data, setLoading }) => {
  const [deals, setDeals] = useState();
  const [error, setError] = useState("");

  const getAllDeals = async () => {
    await fetch("https://sales.zuri.chat/api/v1/deals/")
      .then((response) => response.json())
      .then((data) => setDeals(data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    getAllDeals();
  }, []);

  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);

  const [open2, setOpen2] = useState(false);
  const handleOpenModal2 = () => setOpen2(true);

  const handleCloseModal = () => {
    setOpen(false);
    setOpen2(false);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      {deals &&
        deals.map((deal, index) => {
          if (data === deal.deal_stage) {
            return (
              <Draggable key={deal._id} draggableId={deal._id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div
                      key={deal._id}
                      className={`w-64 h-44 mb-4 bg-white shadow border border-gray-50 px-4 py-2 flex flex-col gap-3 border-t-2  
                                        border-indigo-300 rounded`}
                    >
                      {/* Edit Deals */}
                      <EditDeals
                        open={open}
                        prospectID={deal.prospect_id}
                        handleCloseModal={handleCloseModal}
                        id={deal._id}
                        name={deal.name}
                        amount={deal.amount}
                        stage={deal.deal_stage}
                        description={deal.description}
                        date={deal.close_date}
                        deals={deals}
                        setDeals={setDeals}
                      />
                      <div className="flex justify-between items-center">
                        <div className="flex">
                          {/* <FileText className="w-8 mr-4" strokeWidth={1}/> */}
                          <span className="font-bold text-lg mt-2 text-gray-700">
                            {deal.name}
                          </span>
                        </div>
                        <DealsOptions
                          handleOpenModal={handleOpenModal}
                          handleCloseModal={handleCloseModal}
                          handleOpenDeleteModal={handleOpenModal2}
                          handleCloseDeleteModal={handleCloseModal}
                        />
                      </div>
                      <p>{error}</p>
                      <div className="flex flex-col text-left">
                        <p className="text-gray-500">{deal.description} </p>
                        <div className="mt-2">
                          <p className="text-indigo-500 font-bold mt-2">
                            {deal.amount}
                          </p>
                          <div className="flex gap-2 text-gray-400 text-base pt-2">
                            <Calendar /> -<p className="">{deal.close_date}</p>
                          </div>
                        </div>
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
