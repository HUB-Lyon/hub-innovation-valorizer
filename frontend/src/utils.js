function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getRoles = async () => {
  const res = await fetch(`/roles.json`)
  return await res.json()
}

const getInventory = async () => {
  const res = await fetch(`/inventory.json`)
  return await res.json()
}


export {
  classNames,
  getRoles,
  getInventory,
}