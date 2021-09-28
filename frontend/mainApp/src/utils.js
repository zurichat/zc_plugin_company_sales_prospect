// import { GetUserInfo } from "@zuri/zuri-control";
// import { GetUserInfo } from "https://zuri.chat/zuri-control.js";

import Swal from "sweetalert2";

export const capitalize = (word) => {
  if (word !== undefined) {
    const lower = word.toLowerCase();
    word = word.charAt(0).toUpperCase() + lower.slice(1);
  }
  return word
};

export const formatProspects = (prospects) => {
  return prospects.map((p) => {
    return {
      id: p._id,
      name: p.name,
      email: p.email,
      phone: p.phone_number,
      status: capitalize(p.deal_stage),
    };
  });
};

export const formatProspect = (prospect) => {
  return {
    id: prospect.id,
    name: prospect.name,
    email: prospect.email,
    phone: prospect.phone_number,
    status: capitalize(prospect.deal_stage),
  };
}

export const formatAPIProspect = (prospect) => {
  return {
    id: prospect.id,
    name: prospect.name,
    email: prospect.email,
    phone_number: prospect.phone,
    deal_stage: capitalize(prospect.status),
  };
}

export const doesProspectExist = (prospects, name) => {
  return prospects.filter((x) => x.name === name).length > 0;
};

export const updateProspects = (prospects, id, newDetails) => {
  let p = prospects;
  const prospect = p.find((x) => x.id === id);
  const i = p.indexOf(prospect);
  if (i > 0) {
    p[i] = newDetails;
  }
  return p;
};

export const customAlert = (message, type = "success" || "warning" || "info" || "error") => {

  Swal.fire({
    text: message,
    icon: type,
    showCancelButton: false,
  });
}

//Store token in localstorage
export const token = sessionStorage.getItem("token");

//Store user copy in localstorage
export const user = JSON.parse(sessionStorage.getItem("user"));

// export const getUserInfo = async (userID = user.id, token = token) =>
//   GetUserInfo(userID, token);

// export const getUserInfo = async () =>
//   GetUserInfo();

export const dummyProspects = [
    { id: "0", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Prospect" },
    { id: "1", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Closed" },
    { id: "2", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Negotiation" },
    { id: "3", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Proposal" },
    { id: "4", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Negotiation" },
    { id: "5", name: "Jane Cooper", email: "jane.cooper@example.com", phone: "09093527277", status: "Prospect" }
]