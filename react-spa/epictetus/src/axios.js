import axios from "axios";

export const API_ENDPOINT = "https://sales.zuri.chat"

export const prospectsURL = `${API_ENDPOINT}/prospects/`
export const createProspectURL = `${API_ENDPOINT}/prospects/create/`
export const dealsURL = `${API_ENDPOINT}/deals/`
export const onboardingURL = `${API_ENDPOINT}/onboarding/`

export const addToRoomURL = `${API_ENDPOINT}/add-to-room/`
export const roomsURL = `${API_ENDPOINT}/rooms/`
export const leaveRoomURL = `${API_ENDPOINT}/leave-room/`

const customAxios = axios.create({
    baseURL: API_ENDPOINT
})

export default customAxios