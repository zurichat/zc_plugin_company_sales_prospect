import { GetUserInfo } from "@zuri/zuri-sidebar";
// import { GetUserInfo } from "https://zuri.chat/zuri-sidebar.js";

export const capitalize = (word) => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
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

//Store token in localstorage
export const token = sessionStorage.getItem("token");

//Store user copy in localstorage
export const user = JSON.parse(sessionStorage.getItem("user"));

export const getUserInfo = async (userID = user.id, token = token) =>
  GetUserInfo(userID, token);
