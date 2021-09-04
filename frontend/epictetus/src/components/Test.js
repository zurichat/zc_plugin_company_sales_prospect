import React, { useState } from "react";
import ChevronDown from "./svg/ChevronDown";
import ChevronLeft from "./svg/ChevronLeft";
import ChevronRight from "./svg/ChevronRight";
import ChevronUp from "./svg/ChevronUp";
import DotIcon from "./svg/DotIcon";
import FilterIcon from "./svg/FilterIcon";
import SearchIcon from "./svg/SearchIcon";
import SettingsIcon from "./svg/SettingsIcon";
import CustomButton from "./CustomButton";
import CreateDealForm from "./CreateDealForm";
import Input from "./input";
import CheckBox from "./CheckBox";

import { FaUserTie } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function Test() {
  return (
    <>
      <h2 className="text-4xl font-bold pb-10 m-10">
        Svg Icons exported from figma
      </h2>
      <div className="bg-green-400 h-48 border-8 border-gray-700"></div>
      <input type="text" name="" id="" />
      <div className="flex justify-around ...">
        <ChevronDown />
        <ChevronUp />
        <ChevronRight />
        <ChevronLeft />
        <DotIcon color="#7F7A00" />
        <FilterIcon />
        <SearchIcon />
        <SettingsIcon />
      </div>
      <h2 className="text-4xl font-bold pb-10 m-10">Custom Buttons</h2>
      <div className="button-box">
        <CustomButton value="custom1" />
        <CustomButton value="custom2" />
      </div>

        <div className="button-box text-center">
        <CheckBox name="checkbox" label="my checkbox"/>
    
        </div>

      <div>
        <CreateDealForm />
      </div>

      <Input title="name" label="Name" placeholder="enter your name" />
    </>
  );
}

const droperItems = [
  {
    id: "one",
    title: "Alberts deal",
    name: "Albert Mae",
    desc: "The deal was closed on the bases of completion",
    image: { FaUserTie },
    email: "aaaaaaaa@slotmail.za",
  },
  {
    id: "two",
    title: "Johns deal",
    name: "John San",
    desc: "The deal was closed on the bases of completion",
    image: "./logo.svg",
    email: "aaaaaaaa@slotmail.za",
  },
  {
    id: "three",
    title: "Peters deal",
    name: "Peter Ilinos",
    desc: "The deal was closed on the bases of completion",
    image: "./logo.svg",
    email: "aaaaaaaa@slotmail.za",
  },
  {
    id: "four",
    title: "Austin deal",
    name: "Austin Binarf",
    desc: "The deal was closed on the bases of completion",
    image: "./logo.svg",
    email: "aaaaaaaa@slotmail.za",
  },
  {
    id: "five",
    title: "Ints deal",
    name: "Int Macadecemis",
    desc: "The deal was closed on the bases of completion",
    image: "./logo.svg",
    email: "aaaaaaaa@slotmail.za",
  },
];

export const DragDrop = () => {
  const [characters, updateCharacters] = useState(droperItems);

  function handleOnDragEnd(result) {
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="characters"
            >
              {characters.map((z, index) => {
                const { id, title, name, desc, email } = z;
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        className="m-4 bg-gray-100 w-80 h-60 text-gray-700 rounded border-black p-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p className="text-left m-4 text-2xl font-bold">
                          {title}
                        </p>
                        <div className="m-4 text-left text-sm">
                          <p>{desc}</p>
                          <p>Paid: NGN5,000,000</p>
                          <p className="font-medium text-base">{email}</p>
                          <div className="flex flex-col items-end">
                            <FaUserTie className=" from-green-500 text-2xl" />
                            <p className="font-medium text-base">{name}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
