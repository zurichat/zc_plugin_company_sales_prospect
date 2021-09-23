import React, {createContext, useReducer} from "react";
import DealReducer from "./DealReducer";

const initialState = {
    deals:  [
            {
                id: 88,
                name: "Crystal",
                company: "Nigerian Brewery",
                amount: "6700000",
                email: "youcametowatch.@get.com",
                category: "prospects",
            },
            {
                id: 80,
                name: "Youhan",
                company: "NNPC",
                amount: "1B",
                email: "youcametowatch.@get.com",
                category: "proposal",
            },
            {
                id: 7,
                name: "Frranks",
                email: "youcametowatch.@get.com",
                company: "JONSON'S INC",
                amount: "500,000",
                category: "negotiation",
            },
            {
                id: 42,
                name: "Naza",
                email: "youcametowatch.@get.com",
                company: "JBc LTD",
                amount: "594540,000",
                category: "negotiation",
            },
            {
                id: 3,
                name: "Klly",
                email: "youcametowatch.@get.com",
                company: "Thytt trbi",
                amount: "10,000",
                category: "closed",
            },
        ]
};

export const DealsContext = createContext(initialState);

export const DealsProvider = ({children}) => {
    const [state, dispatch] = useReducer(DealReducer, initialState);

    const addDeal = (deals) => {
        dispatch({
            type: 'ADD_DEAL',
            payload: deals
        })
    }

    const editDeal = (deal) => {
        dispatch({
            type: "EDIT_DEAL",
            payload: deal,
        });
    };

    const deleteDeal = (id) => {
        dispatch({
            type: "DELETE_DEAL",
            payload: id,
        });
    };
    return (
        <DealsContext.Provider
            value={{deals: state.deals, editDeal, deleteDeal, addDeal}}
        >
            {children}
        </DealsContext.Provider>
    );
};
