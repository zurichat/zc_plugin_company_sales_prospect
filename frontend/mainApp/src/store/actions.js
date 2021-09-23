export const fetchProspects = () => {
    return dispatch => {
        dispatch(authStart());
        axios.post(refreshURL, {
            refresh: refreshToken,
        })
        .then(r => {
            
        })
        .catch(err => {
            
        })
    }
}

export const fetchDeals = () => {
    return dispatch => {
        dispatch(authStart());
        axios.post(refreshURL, {
            refresh: refreshToken,
        })
        .then(r => {
            
        })
        .catch(err => {
            
        })
    }
}