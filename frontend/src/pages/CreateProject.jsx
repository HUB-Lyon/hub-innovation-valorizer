import React, { useEffect, useState } from "react";
import { GlobeAltIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { useMsal } from "@azure/msal-react";

import UserSelector from "../components/UserSelector";
import Input from "../components/Input";
import ReactQuill from "react-quill";
import Button from "../components/Button";
import MilestoneSelector from "../components/MillestoneSelector";
import { getInventory, getRoles, getUsers } from "../utils";

import 'react-quill/dist/quill.snow.css';
import InventoryPicker from "../components/InventoryPicker";
import { API_URL } from "../constants";
import toast from "react-hot-toast";

const CreateProject = ({
  isEdit = false,
  toUpdate = null,
  projectData = {},
}) => {
  const { instance, accounts } = useMsal()

  const [users, setUsers] = useState([])
  const [roles, setRoles] = useState([])
  const [inventory, setInventory] = useState([])
  const [me, setMe] = useState(null)
  const [files, setFiles] = useState(projectData?.images || [])

  useEffect(() => {
    const _setRoles = async () => {
      setRoles(await getRoles())
    }
    const _setUsers = async () => {
      setUsers(await getUsers())
    }
    const _setInventory = async () => {
      setInventory(await getInventory())
    }

    _setUsers()
    _setRoles()
    _setInventory()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const _setMe = async () => {
      const _me = users.find(user => user.email === accounts[0].username)
      setMe(_me)
    }

    _setMe()
  }, [users, accounts])

  const formik = useFormik({
    initialValues: {
      name: '',
      shortDescription: '',
      description: '',
      members: [],
      intra: '',
      github: '',
      materialNeeded: [],
      xp: 0,
      milestones: [],
      ...projectData
    },
    onSubmit: async (values) => {
      const userToken = (await instance.acquireTokenSilent({ scopes: ['User.Read'], account: accounts[0] })).idToken
      const images = (await Promise.all(
        files.map(async file => {
          if (!file.name)
            return file
          const res = await fetch(`${API_URL}/file-uploader`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify(file),
          })
          if (res.ok)
            return await res.text()
        })
      )).filter(e => e)

      const res = await fetch(`${API_URL}/projects/${toUpdate || ''}`, {
        method: isEdit ? 'PATCH' : 'POST',
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${userToken}`
        },
        body: JSON.stringify({ ...values, images })
      })
      if (res.ok) {
        toast.success('OK')
      } else {
        toast.error('KO')
      }
    },
  })

  const addFile = async (e) => {
    Array.from(e.target.files).map(async file => {
      return await new Promise(() => {
        const reader = new FileReader()

        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setFiles(old => [
            ...old,
            {
              name: file.name,
              content: reader.result
            }
          ])
        }
      })
    })
  }

  const removeFile = (fileName) => {
    setFiles(old => old.filter(file => {
      if (file.name)
        return file.name !== fileName
      return file !== fileName
    }))
  }

  return (
    <div>
      <h1 className="font-bold text-3xl mb-5 text-center">{isEdit ? 'Modifier un projet' : 'Créer un projet'}</h1>
      <form onSubmit={formik.handleSubmit} className="grid gap-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="grid gap-4">
            <Input label="Nom" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Is this ponpon ?" value={formik.values.name} />
            <Input label="Description courte" name="shortDescription" onChange={formik.handleChange} onBlur={formik.handleBlur} as="textarea" rows={3} placeholder="UwU" value={formik.values.shortDescription} />
            <Input label="XP" name="xp" type="number" onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="42" value={formik.values.xp} />
            <div className="flex flex-col gap-4">
              <Input type="url" label="Lien du dossier Github" name="github" onChange={formik.handleChange} onBlur={formik.handleBlur} LeftIcon={GlobeAltIcon} placeholder="https://github.com/..." value={formik.values.github} />
              {/* <Input type="url" label="Lien intranet" name="intra" onChange={formik.handleChange} onBlur={formik.handleBlur} LeftIcon={GlobeAltIcon} placeholder="https://intra.epitech.eu/..." /> */}
            </div>
            <div>
              <label htmlFor="user-selector" className="block text-sm font-medium leading-6 text-gray-900">
                Liste des membres
              </label>
              <UserSelector
                users={users}
                roles={roles}
                me={me}
                onChange={(value) => formik.setFieldValue("members", value)}
                initialValues={projectData.members}
              />
            </div>
          </div>

          {/* Right column */}
          <div className="h-full flex flex-col gap-4">
            <div className="h-2/3 mb-4 flex flex-col">
              <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                Contenu
              </label>
              <ReactQuill
                id="content"
                value={formik.values.description}
                onChange={(e) => formik.setFieldValue('description', e)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 flex-grow"
              />
            </div>

            <div className="h-auto">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
                  </div>
                  <input multiple id="dropzone-file" type="file" accept="images/*" className="hidden" onChange={addFile} />
                </label>
              </div>
              <div className="flex overflow-x-auto gap-2 mt-2">
                {files.map(file => (
                  <div className="group relative flex-shrink-0" key={file.name ? file.name : file}>
                    <button type="button" onClick={() => removeFile(file.name || file)} className="hidden group-hover:block absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 p-2 rounded-full bg-white z-10">
                      <TrashIcon className="h-4 aspect-1 text-red-500" />
                    </button>
                    <img src={file.name ? file.content : `${API_URL}/public/${file}`} alt="" className="h-24 aspect-[3/2] object-cover shadow-md group-hover:blur-sm" />
                  </div>
                ))}
                <div className="h-24 w-0 bg-transparent select-none"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MilestoneSelector
            onChange={(values) => {
              formik.setFieldValue('milestones', values)
            }}
            removeMilestone={(idx) => {
              const oldValue = formik.values.milestones
              oldValue.splice(idx, 1)
              formik.setFieldValue("milestones", oldValue)
            }}
            milestones={formik.values.milestones}
          />
          <InventoryPicker
            onChange={(value) => {
              formik.setFieldValue("materialNeeded", value.map(({ id, quantity }) => ({ id, quantity })))
            }}
            inventory={inventory}
          />
        </div>

        {/* Submit button */}
        <div className="flex justify-end mt-4">
          <Button type="submit">Envoyer</Button>
        </div>
      </form>
    </div>
  )
}

export default CreateProject;
