import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { API_URL } from "../constants";
import { useMsal } from "@azure/msal-react";

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [projects, setProjects] = useState([])
  const currentUser = useMsal().accounts[0]
  const {instance} = useMsal()

  useEffect(() => {
    const _setProjects = async () => {
      const userToken = (await instance.acquireTokenSilent({ scopes: ['User.Read'], account: currentUser })).idToken
      const res = await fetch(`${API_URL}/projects`, { headers: { "Authorization": `Bearer ${userToken}` } })

      const _projects = await res.json()
      setProjects(_projects)
      setIsLoading(false)
    }
    _setProjects()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading)
    return <Loading />

  if (projects.length === 0)
    return <div>nothing here</div>

  return (
    <div className="flex flex-col items-center relative">
      <h1 className="font-bold text-3xl mb-5">Liste des projets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map(project => {
          return (
            <a key={project.id} href={`/projects/${project._id}`} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:scale-105 hover:shadow-lg transition duration-200">
              <img className="rounded-t-lg w-full aspect-[3/2] object-cover" src={
                project.images[0]
                ? `${API_URL}/public/${project.images[0]}`
                : "https://source.unsplash.com/350x350/?programming"
              } alt="" />
              <div className="p-3">
                <h2 className="mb-2 text-xl font-title font-bold tracking-tight text-gray-900">{project.name}</h2>
                <p className="mb-3 text-sm text-gray-600 text-justify line-clamp-4">{project.shortDescription}</p>
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default Projects;
