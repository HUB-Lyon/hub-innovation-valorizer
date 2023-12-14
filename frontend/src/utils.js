import { API_URL } from "./constants"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects.json`)
  return await res.json()
}

const getUsers = async () => {
  const res = await fetch(`${API_URL}/users.json`)
  return await res.json()
}

const getRoles = async () => {
  const res = await fetch(`${API_URL}/roles.json`)
  return await res.json()
}

export {
  classNames,
  getProjects,
  getUsers,
  getRoles,
}