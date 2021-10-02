import axios from "axios";

const DEBUG = false;
let API_ENDPOINT = "https://sales.zuri.chat/api/v1";

if (DEBUG) {
	API_ENDPOINT = "http://127.0.0.1:8200/api/v1";
}

export const prospectsURL = `${API_ENDPOINT}/prospects/`;
export const createProspectURL = `${API_ENDPOINT}/prospects/create/`;
export const editProspectURL = `${API_ENDPOINT}/prospects/update/`;
export const dealsURL = `${API_ENDPOINT}/deals/`;
export const createDealURL = `${API_ENDPOINT}/deals/create/`;
export const onboardingURL = `${API_ENDPOINT}/onboarding/`;
export const deleteProspectURL = `${API_ENDPOINT}/prospects/delete/`;
export const addToRoomURL = `${API_ENDPOINT}/add-to-room/`;
export const roomsURL = `${API_ENDPOINT}/rooms/`;
export const leaveRoomURL = `${API_ENDPOINT}/leave-room/`;
export const deleteDealURL = `${API_ENDPOINT}/deals/delete/?id=`;
export const bashDeleteDealsURL = `${API_ENDPOINT}/deals/delete/batch/`;
export const editDealURL = `${API_ENDPOINT}/deals/re-arrange/`;

const customAxios = axios.create({
	baseURL: API_ENDPOINT,
	headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
});

export default customAxios;
