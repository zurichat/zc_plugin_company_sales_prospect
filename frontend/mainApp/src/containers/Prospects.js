import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../components/Button";
// import Input from '../components/Input'
import Modal from "../components/Modal";
import ProspectRow from "../components/ProspectRow";
import { ChevronLeft, ChevronRight } from "react-feather";
// import Select from '../components/Select'
import customAxios, {
  createProspectURL,
  editProspectURL,
  prospectsURL,
  deleteProspectURL,
  createDealURL,
} from "../axios";
import FileIcon from "../components/svg/FileIcon";
// import { Link } from 'react-router-dom'
import { customAlert, doesProspectExist } from "../utils";
import Loader from "../components/svg/Loader.svg";

import { PluginContext } from "../context/store";
// import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from "yup";

// const schema = yup.object().shape({
//   name: yup.string().required(),
//   email: yup.string().required(),
//   phone_number: yup.string().required(),
//   company: yup.string().required(),
// });
// const { register,handleSubmit, formState: { errors }, } = useForm({resolver: yupResolver(schema)});

export const Input = ({
  title,
  label,
  placeholder,
  disabled = false,
  id,
  onChange,
  value,
  defaultValue,
  type,
}) => {
  return (
    <div className="mb-6">
      <label className=" mb-2 block font-bold text-base" htmlFor={title}>
        {label}
      </label>
      <input
        className="border border-gray-500 outline-none placeholder-gray-400 rounded-sm h-12  w-full px-5 focus:border-green"
        onChange={onChange}
        id={id}
        value={value}
        type={type || "text"}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        required
      />
    </div>
  );
}

export const Select = ({
  id,
  title,
  label,
  children,
  disabled,
  onChange,
  value,
  defaultValue
}) => {
  return (
    <div className="mb-6" id={title}>
      <label className=" mb-2 block font-bold text-base" htmlFor={title}>
        {label}
      </label>

      <select
        id={id}
        value={value}
        required
        className="border border-gray-500 text-gray-500 outline-none rounded-sm px-5 h-12 w-full  focus:border-green"
        onChange={onChange}
        defaultValue={defaultValue}
        disabled={disabled}
        required
      >
        {children}
      </select>
    </div>
  );
}

function Prospects() {
  const { prospects, setProspects } = useContext(PluginContext)

  const [prospect, setProspect] = useState({
    id: "",
    name: "",
    email: "",
    phone_number: "",
    company: "",
  });

  const [page, setPage] = useState(1);

  const [deal, setDeal] = useState(null);

  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpenCreateModal = () => setOpen(true);

  const [open2, setOpen2] = useState(false);
  const handleOpenEditModal = (e, prospect) => {
    setProspect(prospect);
    setOpen2(true);
  };

  const [open3, setOpen3] = useState(false);
  const handleOpenDeleteModal = (e, prospect) => {
    setProspect(prospect);
    setOpen3(true)
  };

  const [open4, setOpen4] = useState(false);
  const handleOpenDealCreateModal = (e, prospect) => {
    setProspect(prospect);
    const newDeal = {
      prospect_id: prospect._id,
      name: prospect.name
    }
    setDeal(newDeal)
    setOpen4(true);
  };

  const handleCloseModal = () => {
    setDeal(null)
    setProspect({
      id: "",
      name: "",
      email: "",
      phone_number: "",
      company: "",
    })
    setOpen(false);
    setOpen2(false);
    setOpen3(false);
    setOpen4(false);
  };

  const pageForward = () => {
    setLoading(true);
    setPage(prospects.pageNum + 1);
  }

  const pageBackward = () => {
    setLoading(true);
    setPage(prospects.pageNum - 1);
  }

  useEffect(() => {
    customAxios
      .get(prospectsURL, {
        params: { page: page }
      })
      .then(({data}) => {
        console.log(data.contacts)
        setProspects({
          contacts: data.contacts,
          next: data.next,
          pageNum: data.pageNum,
          prev: data.prev
        })
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        // console.warn("Error fetching prospects!")
      });
  }, [page]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const isProspect = doesProspectExist(prospects, prospect.name);
    if (!isProspect) {
      customAxios
        .post(createProspectURL, prospect)
        .then((r) => {
          handleCloseModal();
          customAxios.get(prospectsURL)
            .then(({ data }) => {
              setProspects({
                contacts: data.contacts,
                next: data.next,
                pageNum: data.pageNum,
                prev: data.prev
              })
            })
            .catch(e => console.log(e.response))
          // const latestProspect = formatProspect(prospect)
          // setProspects([...prospects, latestProspect]);
          customAlert("Contact Created Successfully", "success")
        })
        .catch((e) => {
          console.log(e);
          customAlert("Oops, something went wrong", "error")
        });
    } else {
      alert("Prospect already exists");
    }
  };


  const handleDealCreate = (e) => {
    e.preventDefault();
    const dealInfo = { ...deal, prospect_id: prospect._id, name: prospect.name };
    customAxios
      .post(createDealURL, dealInfo)
      .then((r) => {
        handleCloseModal();
        customAlert("Deal created successfully", "success")
        // history.push("/deals");
      })
      .catch((e) => {
        console.log(e);
        customAlert("Oops, something went wrong", "error")
      });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const apiProspect = {
      object_id: prospect._id,
      name: prospect.name,
      email: prospect.email,
      phone_number: prospect.phone_number,
      company: prospect.company,
    };
    customAxios
      .put(editProspectURL, apiProspect)
      .then((r) => {
        customAlert("Contact Edited Successfully", "success")
        handleCloseModal();
        customAxios
          .get(prospectsURL)
          .then(({ data }) => {
            setProspects({
              contacts: data.contacts,
              next: data.next,
              pageNum: data.pageNum,
              prev: data.prev
            })
          })
          .catch((e) => console.log(e.response));
      })

      .catch((e) => {
        console.log(e)
        customAlert("Oops, something went wrong", "error")

      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    customAxios
      .post(`${deleteProspectURL}`, { 'object_id': prospect._id })
      .then((r) => {
        handleCloseModal();
        customAxios
          .get(prospectsURL)
          .then(({ data }) => {
            customAlert("Contact Deleted Successfully", "success")
            setProspects({
              contacts: data.contacts,
              next: data.next,
              pageNum: data.pageNum,
              prev: data.prev
            })
          })
          .catch((e) => console.log(e.response));
      })
      // .catch(e => console.log(e))

      .catch((e) => {
        console.log(e)
        customAlert("Oops, something went wrong", "error")
      });
  };

  const handleChange = ({ target }) => {
    setProspect({
      ...prospect,
      [target.id]: target.value,
    });
  };

  const handleDealChange = ({ target }) => {
    setDeal({
      ...deal,
      [target.id]: target.value,
    });
  };

  return (
    <div className="p-10 w-screen">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Contact</h3>
        <Button onClick={handleOpenCreateModal}>Create New</Button>
      </div>
      {/* CREATE MODAL */}
      <Modal
        title="Create a Contact"
        description="Provide information about your contact."
        open={open}
        closeModal={handleCloseModal}
      >
        <form className="my-auto" onSubmit={handleSubmit}>
          <div>
            <label className="block">Name</label>
            <Input
              placeholder="Enter Full Name"
              onChange={handleChange}
              id="name"
            />
          </div>
          <div>
            <label className="block">Email</label>
            <Input
              placeholder="Enter Email"
              onChange={handleChange}
              id="email"
            />
          </div>
          <div>
            <label className="block">Phone Number</label>
            <Input
              placeholder="Enter Phone Number"
              onChange={handleChange}
              id="phone_number"
              type="tel"
            />
          </div>
          <div>
            <label className="block">Company</label>
            <Input
              placeholder="Enter Company"
              onChange={handleChange}
              id="company"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-green text-white px-10 py-2">
              Create
            </button>
          </div>
        </form>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        title="Edit Contact"
        description="Provide information about your contact."
        open={open2}
        closeModal={handleCloseModal}
      >
        <form className="mt-2" onSubmit={handleUpdate}>
          <div>
            <label className="block">Name</label>
            <Input
              placeholder="Jane Cooper"
              id="name"
              defaultValue={prospect.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block">Email</label>
            <Input
              placeholder="jane.cooper@example.com"
              id="email"
              defaultValue={prospect.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block">Phone Number</label>
            <Input
              placeholder="09093527277"
              id="phone_number"
              type="tel"
              defaultValue={prospect.phone_number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block">Company</label>
            <Input
              placeholder="Enter Company"
              onChange={handleChange}
              id="company"
              defaultValue={prospect.company}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-green text-white px-10 py-2">
              Edit
            </button>
          </div>
        </form>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        title="Delete Prospect"
        description="This prospect will be deleted, this action cannot be undone."
        open={open3}
        closeModal={handleCloseModal}
      >
        <div className="mt-2">
          <div>
            <label className="block">Name</label>
            <Input
              placeholder="Jane Cooper"
              id="name"
              value={prospect.name}
              disabled
            />
          </div>
          <div>
            <label className="block">Email</label>
            <Input
              placeholder="jane.cooper@example.com"
              id="email"
              value={prospect.email}
              disabled
            />
          </div>
          <div>
            <label className="block">Phone Number</label>
            <Input
              placeholder="09093527277"
              id="phone_number"
              value={prospect.phone_number}
              disabled
            />
          </div>
          <div>
            <label className="block">Company</label>
            <Input
              placeholder="Enter Company"
              onChange={handleChange}
              id="company"
              defaultValue={prospect.company}
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            className="text-green px-10 py-2 mr-2"
            onClick={handleCloseModal}
          >
            No, Keep
          </button>
          <button
            type="button"
            className="bg-error text-white px-10 py-2"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
        </div>
      </Modal>

      {/* CREATE DEAL MODAL */}
      <Modal
        title="Create a deal"
        description={`Create a deal for ${prospect.name}. Please provide all necessary information.`}
        open={open4}
        closeModal={handleCloseModal}
      >
        <form className="mt-2" onSubmit={handleDealCreate}>
          <div>
            <Select
              title="stage"
              label="Deal stage"
              id="deal_stage"
              onChange={handleDealChange}
            >
              <option>Select a stage</option>
              <option>Proposal</option>
              <option>Closed</option>
              <option>Negotiation</option>
              <option>Prospect</option>
            </Select>
          </div>
          <div>
            <label className="block">Amount</label>
            <Input
              type="number"
              onChange={handleDealChange}
              placeholder="Enter Amount"
              id="amount"
            />
          </div>
          <div>
            <label className="block">Expected close date</label>
            <Input
              placeholder="dd-mm-yy"
              onChange={handleDealChange}
              id="close_date"
              type="date"
            />
          </div>
          <div>
            <label className="block">Description</label>
            <Input
              placeholder="Additional info"
              onChange={handleDealChange}
              id="description"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              onClick={() => handleDealCreate()}
              className="bg-green text-white px-10 py-2"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>

      {prospects.contacts.length > 0 && !loading ? (
        <div className="mt-4">
          <div className="overflow-x-auto overflow-y-hidden rounded-md">
            <table className="text-left border-gray-100 w-full">
              <thead className="border-b cursor-pointer">
                <tr>
                  <th className="px-3 py-4">
                    <span className="flex items-center">
                      <input className="mr-4" type="checkbox" name="" id="all" />
                      <label htmlFor="all">Name</label>
                    </span>
                  </th>
                  <th className="px-3 py-4">Email</th>
                  <th className="px-3 py-4">Phone Number</th>
                  <th className="px-3 py-4">Company</th>
                  <th className="px-3 py-4"> Actions </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {prospects.contacts.map((prospect, i) => (
                  <ProspectRow
                    key={i}
                    openEditModal={handleOpenEditModal}
                    openDealCreateModal={handleOpenDealCreateModal}
                    openDeleteModal={handleOpenDeleteModal}
                    prospect={prospect}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex list-none justify-end items-center mt-5">
            <button onClick={() => pageBackward()} disabled={!prospects.prev} className="flex items-center py-2 px-3 cursor-pointer border-0 disabled:text-gray-300">
              {" "}
              <ChevronLeft strokeWidth={1} />{" "} <span className="py-2 px-3">Prev</span>
            </button>
            <div className="bg-green-light text-green rounded-sm py-2 px-4">
              {prospects.pageNum}
            </div>
            <button onClick={() => pageForward()} disabled={!prospects.next} className="flex items-center py-2 px-3 cursor-pointer border-0 disabled:text-gray-300">
              <span className="py-2 px-3">Next</span>{" "}
              <ChevronRight strokeWidth={1} />{" "}
            </button>
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
                Loading available prospects
              </h2>
              <br />
              <p className="text-base text-gray-400 text-center">
                Please wait a while
              </p>
            </div>
          ) : (
            <div className="mt-4">
              <div className="overflow-x-auto overflow-y-hidden rounded-md">
                <table className="text-left border-gray-100 w-full">
                  <thead className="border-b cursor-pointer">
                    <tr>
                      <th className="px-3 py-4 flex items-center">
                        <input
                          className="mr-4"
                          type="checkbox"
                          name=""
                          id="all"
                        />
                        <label htmlFor="all">Name</label>
                      </th>
                      <th className="px-3 py-4">Email</th>
                      <th className="px-3 py-4">Phone Number</th>
                      <th className="px-3 py-4">Company</th>
                      <th className="px-3 py-4"> Actions </th>
                    </tr>
                  </thead>
                </table>
                <div className="flex w-100 items-center justify-center flex-col text-center pt-32">
                  <div className="shadow-lg w-96 justify-center flex p-10 flex-col items-center">
                    <FileIcon />
                    <p className="font-bold text-xl mt-5">
                      You have no contact yet!
                    </p>
                    <p className="max-w-sm py-3 flex-wrap text-gray-400">
                      Keep track of business transactions with all your contacts
                      in an organised manner. Quickly add a contact to get
                      started.
                    </p>
                    <div className="flex">
                      <button
                        className="border-green px-4 rounded-sm text-green mr-2"
                        onClick={handleCloseModal}
                      >
                        Skip
                      </button>
                      <Button onClick={handleOpenCreateModal}>
                        Add Contact
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Prospects;
