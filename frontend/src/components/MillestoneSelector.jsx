import { useState } from "react";
import Input from "./Input";
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Button from "./Button";
import { PlusIcon } from "@heroicons/react/20/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

const MilestoneSelector = ({
  onChange,
  removeMilestone,
  milestones,
}) => {
  const cancelButtonRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingIdx, setIsEditindIdx] = useState(null)

  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [description, setDescription] = useState("")

  const resetForm = () => {
    setTitle("")
    setDate("")
    setDescription("")
  }

  const onConfirm = () => {
    if (isEditingIdx === null) {
      onChange([...milestones, { title, date, description }])
    } else {
      const oldValues = milestones

      oldValues[isEditingIdx].title = title
      oldValues[isEditingIdx].date = date
      oldValues[isEditingIdx].description = description

      onChange(oldValues)

      setIsEditindIdx(null)
    }
    setIsModalOpen(false)
    resetForm()
  }

  const onCancel = () => {
    setIsModalOpen(false)
    resetForm()
  }

  return (
    <>
      <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setIsModalOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="sm:flex sm:items-start w-full flex flex-col">

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} label="Titre" />
                        <Input value={date} onChange={(e) => setDate(e.target.value)} label="Date" type="date" />
                      </div>
                      <Input value={description} onChange={(e) => setDescription(e.target.value)} label="Description" as="textarea" rows={7} />

                    </div>
                    <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse sm:gap-3">
                      <Button
                        type="button"
                        onClick={onConfirm}
                        disabled={!title || !date || !description}
                      >
                        Confimer
                      </Button>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={onCancel}
                        ref={cancelButtonRef}
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      <div className="mx-8">
        <h2 className="block text-sm font-medium leading-6 text-gray-900">
          Milestones
        </h2>
        <div className="relative mx-4 px-3 space-y-8 before:absolute before:top-2 before:bottom-0 before:w-0.5 before:-left-2 before:bg-gray-300 mb-8">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="flex flex-col relative before:absolute before:top-2 before:w-4 before:h-4 before:rounded-full before:-left-[35px] before:z-[1] before:bg-epitechBlue group">
              <h3 className="text-xl font-semibold flex justify-between items-center">
                {milestone.title}
                <div className="hidden group-hover:flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const oldvalue = milestones[idx]

                      setIsEditindIdx(idx)
                      setTitle(oldvalue.title)
                      setDate(oldvalue.date)
                      setDescription(oldvalue.description)
                      setIsModalOpen(true)
                    }}
                  >
                    <PencilIcon className="h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeMilestone(idx)}
                  >
                    <TrashIcon className="h-4 text-red-500" />
                  </button>
                </div>
              </h3>
              <time className="text-xs tracking-wide uppercase text-gray-400">{milestone.date}</time>
              <p className="mt-2 whitespace-pre-wrap text-justify">{milestone.description}</p>
            </div>
          ))}
        </div>
        <Button onClick={() => setIsModalOpen(true)} type="button">
          <div className="flex items-center">
            <PlusIcon className="h-6 mr-2" />
            <span>Ajouter une milestone</span>
          </div>
        </Button>
      </div>
    </>
  )
}

export default MilestoneSelector;
