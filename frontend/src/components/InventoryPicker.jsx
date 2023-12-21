import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";

const InventoryPicker = ({
  onChange,
  inventory,
}) => {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState([])

  const filteredItems = inventory.filter((item) => {
    const alreadySelectedItems = selected.map(e => e.name)

    if (query === '')
      return !alreadySelectedItems.includes(item.name)
    return item.name.toLowerCase().includes(query.toLowerCase()) && !alreadySelectedItems.includes(item.name)
  })

  const selectItem = ({ id, name }) => {
    setSelected(old => [...old, { id, name, quantity: 1 }])
  }

  useEffect(() => {
    onChange(selected)
  }, [selected]) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="">
      <h2 className="block text-sm font-medium leading-6 text-gray-900">
        Matériel nécéssaire
      </h2>
      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-2 xl:gap-4">
        {selected.map(item => (
          <li key={item.id} className='grid grid-cols-4 last:border-0 shadow-md rounded-lg ring-1 ring-gray-300'>
            <div className="col-span-3 truncate whitespace-nowrap text-sm flex items-center ml-2">{item.name}</div>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => {
                const newValue = e.target.value

                setSelected(old => {
                  const test = [...old]
                  const index = test.findIndex(_item => _item.id === item.id)
                  test[index].quantity = newValue
                  return test
                })

              }}
              min="0"
              className="border-0 rounded-r-lg text-right"
            />
          </li>
        ))}

      </ul>
      <Combobox value={""} onChange={selectItem} id="user-selector">
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              // as={Input}
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0 ring-1 ring-gray-300"
              displayValue={(item) => item.name}
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
              {filteredItems.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                  Aucun résultat.
                </div>
              ) : (
                filteredItems.slice(0, 5).map((item) => (
                  <Combobox.Option
                    key={item.id}
                    className={({ active }) => `relative cursor-default select-none p-2 ${active ? 'bg-epitechBlue-800 text-white' : 'text-gray-900'}`}
                    value={item}
                  >
                    {({ selected }) => (
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {item.name}
                      </span>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

    </div>
  )
}

export default InventoryPicker;
