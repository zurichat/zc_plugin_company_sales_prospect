import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import DealCard from "../components/DealCard";
import Modal from "../components/Modal";
import customAxios, { dealsURL } from "../axios";

import FilterDeal from "../components/FilterDeal";
import FilterDeals from "../components/FilterDeals";
import FilterButton from "../components/FilterButton";
import { PluginContext } from "../context/store";
import axios from "axios";

const Deals = () => {

  const [loading, setLoading] = useState(true);
  const { deals, setDeals } = useContext(PluginContext)



  const [toggle, setopen] = useState(false);
  const OpenModal = () => setopen(true);
  const CloseModal = () => setopen(false);


  useEffect(() => {
    customAxios
      .get(dealsURL)
      .then((r) => {
        console.log(r.data);

        setDeals(r.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.response);
      });
  }, []);


  // axios.delete(`https://sales.zuri.chat/api/v1/deals/delete/${_id}`)
  

  

  return (
    <div className="p-6">
      <Modal
        title="Filter deal"
        description="Filter deal to quickly find your prospects on the deal pipeline.
      You can filter by one or more criteria."
        open={toggle}
        closeModal={CloseModal}
      >
        <div className="w-full mt-6">
          <FilterDeals />
          <FilterDeal className="relative -top-28" />
        </div>

        <form className=" relative top-72 z-50 flex justify-end">
          <button
            type="reset"
            className="text-btngreen px-10 py-2 border-none"
            onClick={Modal}
          >
            Reset
          </button>
          <button
            type="button"
            className="bg-green text-white px-10 py-2 rounded"
            onClick={CloseModal}
          >
            Done
          </button>
        </form>
      </Modal>

      <div className="flex gap-2 justify-end">
        <FilterButton onClick={OpenModal}>Filter</FilterButton>
        <Button>
          Create New
        </Button>
      </div>

      <div className="overflow-x-auto">

        <div className="w-max lg:w-full">

          <div className="grid grid-cols-4 mt-5 border-gray-300">
            <div className="px-24 lg:px-8 border-b border-gray-300 py-2 text-left">
              <span className="block font-bold text-lg text-gray-700">
                Prospects
              </span>
              <span className="text-sm text-gray-500">
                3 deals • $ 1,500,000
              </span>
            </div>
            <div className="px-24 lg:px-8 text-left border-b border-gray-300 py-2">
              <span className="block font-bold text-lg text-gray-700">
                Proposal
              </span>
              <span className="text-sm text-gray-500">
                3 deals • $ 1,500,000
              </span>
            </div>
            <div className="px-24 lg:px-8 text-left border-b border-gray-300 py-2">
              <span className="block font-bold text-lg text-gray-700">
                Negotiation
              </span>
              <span className="text-sm text-gray-500">
                3 deals • $ 1,500,000
              </span>
            </div>
            <div className="px-24 lg:px-8 text-left border-b border-gray-300 py-2">
              <span className="block font-bold text-lg text-gray-700">
                Closed
              </span>
              <span className="text-sm text-gray-500">
                3 deals • $ 1,500,000
              </span>
            </div>
          </div>

          <div className="grid grid-cols-4 border border-t-0 border-gray-300 rounded h-screen2">
            <div className="border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4">
              {deals
                .filter(x => x.deal_stage && x.deal_stage.toLowerCase() === "prospect")
                .map((deal, i) => (
                  <DealCard key={deal._id} deal={deal} index={i}  />
                ))}
            </div>
            <div className=" border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4">

              {deals
                .filter(x => x.deal_stage && x.deal_stage.toLowerCase() === "proposal")
                .map((deal, i) => (
                  <DealCard key={deal._id} deal={deal} index={i}   />
                ))}
            </div>
            <div className=" border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4">
              {deals
                .filter(x => x.deal_stage && x.deal_stage.toLowerCase() === "negotiation")
                .map((deal, i) => (
                  <DealCard key={deal._id} deal={deal} index={i} />
                ))}

            </div>
            <div className=" border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4">
              {deals
                .filter(x => x.deal_stage && x.deal_stage.toLowerCase() === "closed")
                .map((deal, i) => (
                  <DealCard key={deal._id} deal={deal} index={i}   />
                ))}
            </div>
          </div>

        </div>

      </div>
      
    </div>

  );
};
export default Deals;
