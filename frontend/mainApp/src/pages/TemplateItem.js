import React, { useState } from "react";

const TemplateItem = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailData = {
      from,
      to,
      subject,
      message,
    };

    console.log(emailData);
  };
  return (
    <div class="newsletter">
      <div class="newsHeader flex py-4 px-4 justify-between items-center">
        <h1>Newsletter</h1>

        <div class="buttons">
          <button class="bg-green-500 text-white py-3 px-7 rounded mr-4">
            Save
          </button>
          <button class="bg-red-700 text-white py-3 px-7 rounded">
            Delete
          </button>
        </div>
      </div>

      <div class="newsletterFormContainer">
        <div class="container flex justify-center flex-col m-auto px-5">
          <h1 class="mt-4 mb-4 font-bold">Newsletter Template</h1>
          <p class="template-text">
            Create a template for your emails. Provide all possible details
            about your template.
          </p>

          <form onSubmit={handleSubmit} class="w-full">
            <div class="formControl">
              <label class="block text-gray-700 text-sm font-bold mb-2 mt-4">
                From
              </label>
              <input
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  mb-4
                "
                type="text"
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div class="formControl">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                To
              </label>
              <input
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  mb-4
                "
                type="text"
                id="toInput"
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div class="formControl">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Subject
              </label>
              <input
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  mb-4
                "
                type="text"
                value="The New Way To Collaborate"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div class="formControl">
              <label class="block text-gray-700 text-sm font-bold mb-2">
                Message
              </label>
              <textarea
                class="
                  shadow
                  appearance-none
                  border
                  rounded
                  w-full
                  py-2
                  px-3
                  text-gray-700
                  leading-tight
                  focus:outline-none focus:shadow-outline
                  mb-4
                "
                type="text"
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div class="buttonAlign flex items-end justify-end flex-end">
              <button class="bg-green-500 text-white py-3 px-7 rounded mr-4 mb-4">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TemplateItem;
