import axios from 'axios'

const OnboardCompany = ({body}) => {
    return axios.post('https://sales.zuri.chat/api/v1/onboarding/create/', 
    body,
    {
        headers: {
            'Origin': 'https://sales.zuri.chat',
            'Authorization': 'bearer <token>'
        }
    });
   
}

export default OnboardCompany;