import axios from 'axios'

const OnboardCompany = ({body}) => {
    return axios.post('https://sales.zuri.chat/api/v1/onboarding/create/', 
    body,
    {
        headers: {
            'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWUiOiJNVFl6TVRnek1qa3pObnhIZDNkQlIwUlplRTVFVG1wWmFsazBXa1JCZVU5RVVtbFplbHBvVDFSSmVVMTZXVFZPVVQwOWZCTGZrVGRSMmZZMFhaZThIT25XdHNicVhvMmZpMFZwRkg5NzgwU2luRDVFIiwiZW1haWwiOiJ4NXMudG9zaW5AZ21haWwuY29tIiwiaWQiOiI2MTQzY2I2OGQwMjg0YmM2YTkyMjM2OTUiLCJvcHRpb25zIjp7IlBhdGgiOiIvIiwiRG9tYWluIjoiIiwiTWF4QWdlIjo0MjMzNjAwLCJTZWN1cmUiOmZhbHNlLCJIdHRwT25seSI6ZmFsc2UsIlNhbWVTaXRlIjowfSwic2Vzc2lvbl9uYW1lIjoiZjY4MjJhZjk0ZTI5YmExMTJiZTMxMGQzYWY0NWQ1YzcifQ.8Jy_nd9c0c5yfmoQTX9smj9yLR0vY5Wer1Sx3f14xXs'
        }
    });
   
}

export default OnboardCompany;