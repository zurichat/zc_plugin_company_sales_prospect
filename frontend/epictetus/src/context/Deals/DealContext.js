import React, {createContext, useState, useReducer} from "react";
import DealReducer from "./DealReducer";

export const DealsContext = createContext();

export const DealsProvider = ({children}) => {

    const [deals, setDeals] = useState([
        
        {
            id: 1,
            name: "Deb",
            deal_stage: "prospects",
            amount: "230,000",
            date: "12-09-2021",
            description: "Buying"
        },
        {
            id: 2,
            name: "Sam",
            deal_stage: "negotiation",
            amount: "230,000",
            date: "12-09-2021",
            description: "Buying"
        },
        {
            id: 3,
            name: "Jim",
            deal_stage: "proposal",
            amount: "230,000",
            date: "12-09-2021",
            description: "Buying"
        },
        {
            id: 4,
            name: "Ann",
            deal_stage: "closed",
            amount: "230,000",
            date: "12-09-2021",
            description: "Buying"
        }

    ]);

    const [state, dispatch] = useReducer(DealReducer, deals);

    const editDeal = (deal) => {
        dispatch({
            type: 'EDIT_DEAL',
            payload: deal
        })
    }


    const deleteDeal = id => {
        setDeals(deals.filter(deal => deal.id !== id))
    }
    return (
        <DealsContext.Provider
            value={{data: state.deals, deals, editDeal, deleteDeal}}
        >
            {children}
        </DealsContext.Provider>
    );
};