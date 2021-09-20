export const dealsReducer = (state, action) => {
    switch (action.type) {
        case  "ADD_DEAL":
            return {
                ...state.deals,
                deals: [...state.deals, action.payload]
            }

        case "EDIT_DEAL":
            const updatedDeal = action.payload;
            const updatedDeals = state.deals.map((deal) => {
                if (deal.id === updatedDeal.id) {
                    return updatedDeal;
                }
                return deal;
            });

            return {
                ...state,
                deals: updatedDeals,
            };
        case "DELETE_DEAL":
            return {
                ...state,
                deals: state.deals.filter((deal) => deal.id !== action.payload),
            };

        default:
            return state;
    }
};
