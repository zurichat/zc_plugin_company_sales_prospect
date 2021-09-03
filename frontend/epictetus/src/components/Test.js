import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FaUserTie } from "react-icons/fa";

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

export function DragDrop() {
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
              id="characters"
              className="flex flex-col items-center"
            >
              {characters.map((z, index) => {
                const { id, title, name, desc, email } = z;
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <div
                        className="m-4 bg-gray-200 w-80 text-gray-700 rounded border-black p-2"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p className="text-left m-4 text-2xl font-medium">
                          {title}
                        </p>
                        <div className="m-4 text-left text-sm">
                          <p>{desc}</p>
                          <p>Paid: NGN5,000,000</p>
                          <p className="font-medium text-base">{email}</p>
                          <div className="flex flex-col items-end">
                            <FaUserTie className="mt-5 mb-1 text-2xl" />
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
}

export default DragDrop;
