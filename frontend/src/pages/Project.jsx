import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import { useParams } from 'react-router-dom'
import MarkdownView from 'react-showdown'
import Loading from '../components/Loading'
import { classNames, getProjects } from '../utils'
import "../styles/markdown.css"

const Project = () => {

  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const [project, setProject] = useState(null)

  useEffect(() => {
    if (!id)
      return

    getProjects().then(res => {
      const tmp = res.find(_project => _project.id === Number(id))
      setProject(tmp)
      setIsLoading(false)
    })

  }, [id])

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
                    <span className='font-semibold'>{member.id}</span> - <span className='lowercase'>{member.role}</span>
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
                <a href={project.github} target="_blank" rel="noreferrer">
                  <img src="/github.svg" alt="Voir le github" className="h-6 aspect-square" />
                </a>
                <a href={project.intra} target="_blank" rel="noreferrer">
                  <img src="/epitech.png" alt="Page intra" className="h-6 aspect-square" />
                </a>
              </div>
            </div>

          </div>
        </div>
        <MarkdownView
          className="markdown whitespace-pre leading-8 text-justify max-w-5xl mx-auto mt-8"
          flavor="original"
          markdown={`${project.description}`}
          options={{ tables: true, emoji: true }}
        />
      </div>
    </div >
  )
}

export default Project;
