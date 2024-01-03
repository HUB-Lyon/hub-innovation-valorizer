import { API_URL } from "./constants"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects`)
  return await res.json()
}

const getUsers = async () => {
  const res = await fetch(`/users.json`)
  return await res.json()
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
  getProjects,
  getUsers,
  getRoles,
  getInventory,
}