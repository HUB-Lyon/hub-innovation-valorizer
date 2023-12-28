import React, { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { ChevronUpDownIcon, TrashIcon } from '@heroicons/react/24/outline';
import Input from './Input';
import Select from './Select';

const UserSelector = ({ users, roles, me, onChange }) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])

  useEffect(() => {
    if (me) {
      setSelected(old => {
        const newValue = [{ email: me.email, id: me.id, role: roles[0].label, ...old }]
        onChange(newValue)
        return newValue
      })
    }
  }, [me]) //eslint-disable-line react-hooks/exhaustive-deps

  const filteredPeople = users.filter((user) => {
    const alreadySelectedEmails = selected.map(e => e.email)

    if (query === '')
      return !alreadySelectedEmails.includes(user.email)
    return user.email.toLowerCase().includes(query.toLowerCase()) && !alreadySelectedEmails.includes(user.email)
  })

  const addUser = ({ email, id }) => {
    setSelected(old => {
      const newValue = [...old, { email, id, role: roles[0].label }]
      onChange(newValue)
      return newValue
    })
  }

  const removeUser = (id) => {
    setSelected(old => old.filter(u => u.id !== id))
  }

  return (
    <>
      {selected.map((user, idx) => (
        <div key={user.id} className='grid grid-cols-1 lg:grid-cols-2 lg:gap-2 mt-2 lg:mt-0'>
          <div className="group relative">
            <Input value={user.email} disabled classes="rounded-b-none lg:rounded-b-lg" />
            {idx !== 0 &&
              <button
                type="button"
                className="absolute top-0.5 right-0 lg:hidden group-hover:block"
                onClick={() => removeUser(user.id)}
              >
                <TrashIcon className="h-4 text-red-500 m-2" />
              </button>
            }
          </div>
          <Select
            options={roles}
            classes="rounded-t-none lg:rounded-t-lg"
            onChange={e => {
              setSelected(old => {
                const userIndex = old.findIndex(u => u.id === user.id)
                old[userIndex].role = e.id
                const parsedValue = old.map(({ id, role }) => ({ id, role }))
                onChange(parsedValue)
                return old
              })
            }}
          />
        </div>
      ))}
      <Combobox value={""} onChange={addUser} id="user-selector">
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              // as={Input}
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(person) => person.email}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Aucun résultat.
                </div>
              ) : (
                filteredPeople.slice(0, 5).map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) => `relative cursor-default select-none p-2 ${active ? 'bg-epitechBlue-800 text-white' : 'text-gray-900'}`}
                    value={person}
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {person.email}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  )

}

export default UserSelector;
