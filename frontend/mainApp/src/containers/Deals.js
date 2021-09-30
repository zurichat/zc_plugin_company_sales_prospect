import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import DealCard from "../components/DealCard";
import Modal from "../components/Modal";
import customAxios, { createDealURL, dealsURL } from "../axios";

import FilterDeal from "../components/FilterDeal";
import FilterDeals from "../components/FilterDeals";
import FilterButton from "../components/FilterButton";
import { PluginContext } from "../context/store";

import { Input, Select } from "./Prospects";
import { customAlert } from "../utils";
import FileIcon from "../components/svg/FileIcon";
import Loader from "../components/svg/Loader.svg";
const Deals = () => {
  const [loading, setLoading] = useState(true);
  const [deal, setDeal] = useState({
    id: "",
    amount: "",
    close_date: "",
    deal_stage: "",
    description: "",
    name: "",
    prospect_id: "",
  });
  const { deals, setDeals, prospects, setProspects } =
    useContext(PluginContext);

  const [openCreate, setOpenCreate] = useState(false);
  const handleOpenCreateModal = () => setOpenCreate(true);

  const [openFilter, setOpenFilter] = useState(false);
  const handleOpenFilterModal = () => setOpenFilter(true);

  const handleCloseModal = () => {
    setOpenCreate(false);
    setOpenFilter(false);
  };

  useEffect(() => {
    customAxios
      .get(dealsURL, {headers:{Authorization: `Bearer ${sessionStorage.getItem("token")}`}})
      .then((r) => {
        console.log(r.data);

        setDeals(r.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.response);
      });

    if (prospects.length <= 0) {
      customAxios
        .get(prospectsURL)
        .then((r) => {
          setProspects(formatProspects(r.data));
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e.response);
        });
    }
  }, []);

  const handleChange = ({ target }) => {
    if (target.id === "prospect_id") {
      const prospect_id = target.value.split("-")[0];
      const name = target.value.split("-")[1];
      setDeal({
        ...deal,
        prospect_id,
        name,
      });
    } else {
      setDeal({
        ...deal,
        [target.id]: target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(deal);

    customAxios
      .post(createDealURL, deal)
      .then((r) => {
        handleCloseModal();
        customAxios
          .get(dealsURL)
          .then((r) => setDeals(r.data))
          .catch((e) => console.log(e.response));
        // const latestDeal = formatProspect(prospect)
        // setProspects([...prospects, latestProspect]);
        customAlert("Deal Created Successfully", "success");
      })
      .catch((e) => {
        console.log(e);
        customAlert("Oops, something went wrong", "error");
      });
  };

  return (
    <div className="p-6">
      <Modal
        title="Filter deal"
        description="Filter deal to quickly find your prospects on the deal pipeline.
        You can filter by one or more criteria."
        open={openFilter}
        closeModal={handleCloseModal}
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
            onClick={handleCloseModal}
          >
            Done
          </button>
        </form>
      </Modal>

      <Modal
        title="Create a deal"
        description="Create a deal for your prospect. Please provide all necessary information."
        open={openCreate}
        closeModal={handleCloseModal}
      >
        <form className="mt-2" onSubmit={handleSubmit}>
          <div className="font-bold mt-7 text-gray-700">
            <Select label="Name" id="prospect_id" onChange={handleChange}>
              <option>Select a contact</option>
              {prospects.length > 0 &&
                prospects.map((prospect, i) => (
                  <option key={i} value={`${prospect.id}-${prospect.name}`}>
                    {prospect.name}
                  </option>
                ))}
            </Select>
          </div>
          <div className="font-bold text-gray-700 rounded">
            <Select
              title="stage"
              label="Deal stage"
              id="deal_stage"
              onChange={handleChange}
            >
              <option>Select a stage</option>
              <option>Active</option>
              <option>Closed</option>
              <option>Negotiation</option>
              <option>Prospect</option>
            </Select>
          </div>
          <div>
            <label className="block font-bold text-gray-700 rounded">
              Amount
            </label>
            <Input
              placeholder="Enter Amount"
              onChange={handleChange}
              id="amount"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700">
              Expected close date
            </label>
            <Input
              placeholder="dd-mm-yy"
              onChange={handleChange}
              id="close_date"
              type="date"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 ">Description</label>
            <Input
              placeholder="Additional Info"
              onChange={handleChange}
              id="description"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-green rounded text-white px-10 py-2">
              Create
            </button>
          </div>
        </form>
      </Modal>

      <div className="flex gap-2 justify-end">
        <FilterButton onClick={handleOpenFilterModal}>Filter</FilterButton>
        <Button onClick={handleOpenCreateModal}>Create New</Button>
      </div>

      {deals.length > 0 && !loading ? (
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
                  .filter(
                    (x) =>
                      x.deal_stage && x.deal_stage.toLowerCase() === "prospect"
                  )
                  .map((deal, i) => (
                    <DealCard key={deal._id} deal={deal} index={i} />
                  ))}
              </div>
              <div className=" border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4">
                {deals
                  .filter(
                    (x) =>
                      x.deal_stage && x.deal_stage.toLowerCase() === "proposal"
                  )
                  .map((deal, i) => (
                    <DealCard key={deal._id} deal={deal} index={i} />
                  ))}
              </div>
              <div className=" border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4">
                {deals
                  .filter(
                    (x) =>
                      x.deal_stage &&
                      x.deal_stage.toLowerCase() === "negotiation"
                  )
                  .map((deal, i) => (
                    <DealCard key={deal._id} deal={deal} index={i} />
                  ))}
              </div>
              <div className=" border-r border-gray-300 overflow-y-auto rounded py-2 flex flex-col items-center gap-4">
                {deals
                  .filter(
                    (x) =>
                      x.deal_stage && x.deal_stage.toLowerCase() === "closed"
                  )
                  .map((deal, i) => (
                    <DealCard key={deal._id} deal={deal} index={i} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <div>
              <img
                src={Loader}
                alt="loader"
                className="animate-ping"
                id="loader"
              />
              <h2 className="font-medium text-2xl text-black-500 text-center">
                Loading available deals
              </h2>
              <br />
              <p className="text-base text-gray-400 text-center">
                Please wait a while
              </p>
            </div>
          ) : (
            <div className="mt-4">
                <div className="flex w-100 items-center justify-center flex-col text-center pt-32">
                  <div className="shadow-lg w-96 justify-center flex p-10 flex-col items-center">
                    <FileIcon />
                    <p className="font-bold text-xl mt-5">
                      You have no deal yet!
                    </p>
                    <p className="max-w-sm py-3 flex-wrap text-gray-400">
                      Keep track of business transactions with all your deals
                      in an organised manner. Quickly add a deal to get
                      started.
                    </p>
                    <div className="flex">
                      <button
                        className="border-green px-4 rounded-sm text-green mr-2"
                        onClick={handleCloseModal}
                      >
                        Skip
                      </button>
                      <Button
                        outline
                        className=""
                        onClick={handleOpenCreateModal}
                      >
                        Add Deal
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </>
      )}
    </div>
  );
};
export default Deals;
