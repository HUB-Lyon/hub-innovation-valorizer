import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import MarkdownView from 'react-showdown'
import toast from "react-hot-toast";
import { useMsal } from '@azure/msal-react'
import Loading from '../components/Loading'
import { API_URL } from '../constants'
import Modal from '../components/Abstract/Modal'
import Input from "../components/Input"
import ImageGallery from '../components/Abstract/Project/ImageGallery'
import ProjectStatusAlert from '../components/Abstract/Project/ProjectStatusAlert'
import ProjectSocials from '../components/Abstract/Project/Socials';
import Milestones from '../components/Abstract/Project/Milestones';
import ActionButtons from '../components/Abstract/Project/ActionButtons';
import ProjectMembers from '../components/Abstract/Project/ProjectMembers';
import "../styles/markdown.css"

const Project = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [project, setProject] = useState(null)
  const [isRefusedModalOpen, setIsRefusedModalOpen] = useState(false)
  const [refusedBecause, setRefusedBecause] = useState('')
  const currentUser = useMsal().accounts[0]
  const { instance } = useMsal()

  const updateProjectStatus = async (status) => {
    try {
      const res = (await fetch(
        `${API_URL}/projects/update-status/${project._id}`,
        {
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          },
          body: JSON.stringify({ status, refusedBecause })
        }
      ))
      const updated = await res.json()
      if (updated.images.length === 0)
        updated.images = ["https://source.unsplash.com/700x700/?programming"]
      else
        updated.images = updated.images.map(url => `${API_URL}/public/${url}`)
      setProject(updated)
      toast.success('OK')
    } catch (err) {
      toast.error('KO')
      console.log(err)
    }
  }

  useEffect(() => {
    const _setUserToken = async () => {
      const _userToken = (await instance.acquireTokenSilent({ scopes: ['User.Read'], account: currentUser })).idToken
      setUserToken(_userToken)
    }

    if (currentUser && instance && !userToken)
      _setUserToken()
  }, [currentUser, instance, userToken])

  useEffect(() => {
    const _setIsAdmin = async () => {
      const res = await fetch(`${API_URL}/users/me`, { headers: { "Authorization": `Bearer ${userToken}` } })
      const me = await res.json()
      setIsAdmin(me.admin)

    }
    const _setProject = async () => {
      const res = await fetch(`${API_URL}/projects/${id}`, { headers: { "Authorization": `Bearer ${userToken}` } })

      const _project = await res.json()
      if (_project.images.length === 0)
        _project.images = ["https://source.unsplash.com/700x700/?programming"]
      else
        _project.images = _project.images.map(url => `${API_URL}/public/${url}`)
      setProject(_project)
      setIsLoading(false)
    }
    if (id && userToken && !project)
      _setProject()
    if (userToken)
      _setIsAdmin()
  }, [id, userToken]) //eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading)
    return <Loading />

  if (!project)
    return <div>not found</div>

  return (
    <div className="bg-white">
      <ActionButtons
        project={project}
        isAdmin={isAdmin}
        currentUser={currentUser}
        updateProjectStatus={updateProjectStatus}
        setIsRefusedModalOpen={setIsRefusedModalOpen}
      />
      <div className="mx-auto max-w-2xl sm:py-24 lg:max-w-7xl lg:px-8 divide-y">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <ImageGallery images={project.images} />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 flex flex-col gap-y-6">
            <div>
              <h1 className="text-3xl font-title font-bold tracking-tight text-gray-900 flex items-center gap-2">
                {project.name}
              </h1>
              <p className="text-base tracking-tight italic text-gray-900">{project.xp} XP</p>
              {(project.createdBy === currentUser.username || isAdmin) && <ProjectStatusAlert project={project} />}
            </div>
            <p className="text-base text-gray-700 line-clamp-4">
              {project.shortDescription}
            </p>
            <ProjectMembers project={project} />
            <ProjectSocials project={project} />
          </div>
        </div>
        <Modal
          open={isRefusedModalOpen}
          setOpen={setIsRefusedModalOpen}
          confirmButtonClassname='bg-red-700'
          confirmLabel='Refuser ce projet'
          onConfirm={() => {
            updateProjectStatus('REFUSED')
            setRefusedBecause('');
          }}
        >
          <span>Commentaire</span>
          <Input as="textarea" rows={6} value={refusedBecause} onChange={e => setRefusedBecause(e.target.value)} />
        </Modal>
        <MarkdownView
          className="markdown whitespace-pre text-justify max-w-5xl mx-auto mt-8 pt-8"
          flavor="original"
          markdown={`${project.description}`}
          options={{ tables: true, emoji: true }}
        />
        <Milestones project={project} />
      </div>
    </div >
  )
}

export default Project;
