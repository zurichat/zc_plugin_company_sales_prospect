export const capitalize = word => {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}

export const formatPropsects = (prospects) => {
  return prospects.map(p => {
    return {
      id: p._id,
      name: p.name,
      email: p.email,
      phone: p.phone_number,
      status: capitalize(p.deal_stage)
    }
  })
}

export const doesProspectExist = (prospects, name) => {
  return prospects.filter(x => x.name === name).length > 0
}