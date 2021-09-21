export default (state, action) => {
    switch (action.type) {
        case 'EDIT_DEAL':
            const updateDeal = action.payload

            const updatedDeals = state.deals.map(deal => {
                if (deal.id === updateDeal.id) {
                    return updateDeal
                }
                return deal
            })
            return {
                deals: updatedDeals
            }
        default:
            return state
    }
}