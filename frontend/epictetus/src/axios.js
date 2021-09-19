import axios from "axios";

const DEBUG = false
let API_ENDPOINT = "https://sales.zuri.chat"

if (DEBUG) { API_ENDPOINT = "http://127.0.0.1:8200/api/v1" }

export const prospectsURL = `${API_ENDPOINT}/prospects/`
export const createProspectURL = `${API_ENDPOINT}/prospects/create/`
export const editProspectURL = `${API_ENDPOINT}/prospects/update/`
export const deleteProspectURL = `${API_ENDPOINT}/prospects/delete/`
export const dealsURL = `${API_ENDPOINT}/deals/`
export const onboardingURL = `${API_ENDPOINT}/onboarding/`

export const addToRoomURL = `${API_ENDPOINT}/add-to-room/`
export const roomsURL = `${API_ENDPOINT}/rooms/`
export const leaveRoomURL = `${API_ENDPOINT}/leave-room/`

const customAxios = axios.create({
    baseURL: API_ENDPOINT
})

export default customAxios;