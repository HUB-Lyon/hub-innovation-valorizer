
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getInventory = async () => {
  const res = await fetch(`/inventory.json`)
  return await res.json()
}

export {
  classNames,
  getInventory,
}