import React, {createContext, useReducer} from "react";
import {dealsReducer} from "./DealsReducer";

const initialState = {
    deals: [{id: "1", name: "Precious", deal_stage: "Prospect", amount: "230,000", date: "12-09-2021", description: "Buying"}],
};

export const DealsContext = createContext(initialState);

export const DealsProvider = ({children}) => {
    const [state, dispatch] = useReducer(dealsReducer, initialState);

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
