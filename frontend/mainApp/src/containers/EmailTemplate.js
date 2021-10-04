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
  getEmailTemplateURL,
  createEmailTemplateURL,
  createDealURL,
} from "../axios";
import FileIcon from "../components/svg/FileIcon";
// import { Link } from 'react-router-dom'
import { customAlert, doesTemplateExist } from "../utils";
import Loader from "../components/svg/Loader.svg";

import { PluginContext } from "../context/emailContext";
import Promo from "../components/svg/EmailResources/Promo.jpg";

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
  required,
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
        required={required || true}
      />
    </div>
  );
};

export const TextArea = ({
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
      <textarea
        className="border border-gray-500 outline-none placeholder-gray-400 rounded-sm h-52 w-full px-5 focus:border-green "
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
};

const EmailTemplate = () => {
  // const { templates, setTemplates } = useContext(PluginContext);
  try {
    let availableTemplates = customAxios.get(getEmailTemplateURL);
    console.log(availableTemplates);
  } catch (error) {
    console.error(error);
  }


const [templates, setTemplates] = useState([
  { id: "3153847234672", template_name: "Promotions" },
  { id: "3153847234672", template_name: "Arannt" },
  { id: "3153847234672", template_name: "Tech Creek" },
  ]);
  // let templater = [
  //   { id: "3153847234672", template_name: "Promotions" },
  //   { id: "3153847234672", template_name: "Arannt" },
  //   { id: "3153847234672", template_name: "Tech Creek" },
  // ];

  const [open, setOpen] = useState(false);
  const handleOpenCreateModal = () => setOpen(true);

  const [open2, setOpen2] = useState(false);
  const handleOpenSuccessModal = () => setOpen2(true);

  const [open3, setOpen3] = useState(false);
  const handleOpenFailureModal = () => setOpen3(true);

  const [template, setTemplate] = useState({
    _id: "",
    template_name: "",
    subject: "",
    email: "",
    message: "",
  });

  const handleCloseModal = () => {
    setTemplate({
      _id: "",
      template_name: "",
      subject: "",
      email: "",
      message: "",
    });
    setOpen(false);
  };

  const handleChange = ({ target }) => {
    setTemplate({
      ...template,
      [target.id]: target.value,
    });
    console.log(template);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isTemplate = doesTemplateExist(templates, template_name);
    if (!isTemplate) {
      customAxios
        .post(createEmailTemplateURL, template)
        .then((r) => {
          handleCloseModal();
          customAxios
            .get(getEmailTemplateURL)
            .then(({ data }) => {
              setTemplates({
                _id: data._id,
                template_name: data.template_name,
                subject: data.subject,
                email: data.email,
                message: data.message,
              });
              console.log({ data });
            })
            .catch((e) => console.log(e.response));
          // const latestProspect = formatProspect(prospect)
          // setProspects([...prospects, latestProspect]);
          customAlert("Template Successfully Created", "success");
        })
        .catch((e) => {
          console.log(e);
          customAlert("Error Creating Template", "error");
        });
    } else {
      alert("Template already exists");
    }
  };

  return (
    <div className="p-10 w-screen">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Email Templates</h3>
        <div className="flex justify-between items-center">
          <Button onClick={handleOpenCreateModal}>Create New</Button>
        </div>
      </div>

      {/* Create Template Modal */}
      <Modal
        title="Create a Template"
        description="Provide information about your template."
        open={open}
        closeModal={handleCloseModal}
      >
        <form className="my-auto" onSubmit={handleSubmit}>
          <div>
            <label className="block">Name</label>
            <Input
              placeholder="Template Name"
              onChange={handleChange}
              id="template_name"
            />
          </div>
          <div>
            <label className="block">Subject</label>
            <Input
              placeholder="Enter Subject Here..."
              onChange={handleChange}
              id="subject"
            />
          </div>
          <div>
            <label className="block">Sender's Email</label>
            <Input
              placeholder="Enter Sender's Email"
              type="email"
              onChange={handleChange}
              id="email"
              required={false}
            />
          </div>
          <div>
            <label className="block">Message</label>
            <TextArea
              className="h-52"
              type="text-field"
              placeholder="Enter Message Here..."
              onChange={handleChange}
              id="message"
            />
          </div>

          <div className="mt-4 flex justify-end">
            <button type="submit" className="bg-green text-white px-10 py-2">
              Create
            </button>
          </div>
        </form>
      </Modal>

      <div className="my-12 flex flex-row bg-blue-500 w-full justify-around flex-wrap">
        {templates.map((an, i) => (
          <div
            key={i}
            className="w-80 hover-w-96 cursor-pointer my-4"
            onClick={handleOpenSuccessModal}
          >
            <img className="rounded-t-xl" src={Promo} alt="template image" />
            <h3 className="bg-green text-xl py-4 text-center rounded-b-xl text-white">
              {an.template_name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailTemplate;
