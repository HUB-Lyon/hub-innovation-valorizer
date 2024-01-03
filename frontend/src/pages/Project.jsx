import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import MarkdownView from 'react-showdown'
import Loading from '../components/Loading'
import { classNames } from '../utils'
import "../styles/markdown.css"
import { API_URL } from '../constants'
import { useMsal } from '@azure/msal-react'

const Project = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState(null)
  const currentUser = useMsal().accounts[0]
  const { instance } = useMsal()

  useEffect(() => {
    const _setProject = async () => {
      const userToken = (await instance.acquireTokenSilent({ scopes: ['User.Read'], account: currentUser })).idToken
      const res = await fetch(`${API_URL}/projects/${id}`, { headers: { "Authorization": `Bearer ${userToken}` } })

      const _project = await res.json()
      if (_project.images.length === 0)
        _project.images = ["https://source.unsplash.com/700x700/?programming"]
      else
        _project.images = _project.images.map(url => `${API_URL}/public/${url}`)
      setProject(_project)
      setIsLoading(false)
    }
    _setProject()
  }, [id])// eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading)
    return <Loading />

  if (!project)
    return <div>not found</div>

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl sm:py-24 lg:max-w-7xl lg:px-8 divide-y">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Tab.Group as="div" className="flex flex-col-reverse">
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                {project.images.map((image, idx) => (
                  <Tab
                    key={idx}
                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                  >
                    {({ selected }) => (
                      <>
                        <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img src={image} alt="" className="h-full w-full object-cover object-center" />
                        </span>
                        <span
                          className={classNames(
                            selected ? 'ring-indigo-500' : 'ring-transparent',
                            'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </Tab>
                ))}
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              {project.images.map((image, idx) => (
                <Tab.Panel key={idx}>
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 flex flex-col gap-y-6">
            {/* Title block */}
            <div>
              <h1 className="text-3xl font-title font-bold tracking-tight text-gray-900">{project.name}</h1>
              <p className="text-base tracking-tight italic text-gray-900">{project.xp} XP</p>
            </div>

            {/* Description */}
            <div>
              <p className="text-base text-gray-700 line-clamp-4">
                {project.shortDescription}
              </p>
            </div>

            {/* Members */}
            <div>
              <h2>Membres du projet</h2>
              <ul className='mt-2 list-disc'>
                {project.members.map(member =>
                  <li key={member.email} className="text-sm italic">
                    <span className='font-semibold'>{member.email}</span> - <span>{member.role}</span>
                  </li>
                )}
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h2>Liens</h2>
              <div className="mt-2 flex gap-2">
                <a href={`https://teams.microsoft.com/l/chat/0/0?users=${project.members.map(member => member.email).join(',')}`} target="_blank" rel="noreferrer">
                  <img src="/teams.svg" alt="Appeler avec teams" className="h-6 aspect-square" />
                </a>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noreferrer">
                    <img src="/github.svg" alt="Voir le github" className="h-6 aspect-square" />
                  </a>
                )}
                {project.intra && (
                  <a href={project.intra} target="_blank" rel="noreferrer">
                    <img src="/epitech.png" alt="Page intra" className="h-6 aspect-square" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
        <MarkdownView
          className="markdown whitespace-pre text-justify max-w-5xl mx-auto mt-8 pt-8"
          flavor="original"
          markdown={`${project.description}`}
          options={{ tables: true, emoji: true }}
        />
        <div className='pt-8 mt-8 mx-auto flex flex-col items-center'>
          <h2 className='pb-6 font-bold text-2xl'>Milestones</h2>
          <div className="relative mx-4 px-3 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-2 before:bg-gray-300 mb-8 max-w-2xl">
            {project.milestones.map((milestone, idx) => (
              <div key={idx} className="flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before:rounded-full before:-left-[35px] before:z-[1] before:bg-epitechBlue group">
                <h3 className="text-xl font-semibold flex justify-between items-center">
                  {milestone.title}
                </h3>
                <time className="text-xs tracking-wide uppercase text-gray-400">{milestone.date}</time>
                <p className="mt-2 whitespace-pre-wrap text-justify">{milestone.description}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div >
  )
}

export default Project;
