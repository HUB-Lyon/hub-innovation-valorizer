import { useEffect, useState } from "react";
import { getInventory } from "../utils";
import { StarIcon } from "@heroicons/react/20/solid";

const Inventory = () => {
  const [inventory, setInventory] = useState([])
  useEffect(() => {
    const _setInventory = async () => {
      const res = await getInventory()
      setInventory(res)
    }
    _setInventory()
  }, [])

  return (
    <>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="font-bold text-3xl mb-5">Inventaire</h1>
          <p className="mt-2 text-sm text-gray-700 flex flex-col">
            <span>Liste de tous les éléments utilisables au HUB.</span>
            <span>Si ce que vous cherchez n'est pas dans la liste, vous pouvez faire une demande auprès du responsable du module.</span>
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root overflow-x-auto">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">Nom</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantité disponible</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Quantité totale</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {inventory.sort((a, b) => b.starred - a.starred).map((item) => (
                  <tr key={item.id} className="even:bg-gray-50 hover:bg-gray-100">
                    <td className="whitespace-nowrap flex gap-2 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      {item.starred && <StarIcon className="h-4 text-yellow-400" />} {item.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{item.availableQuantity}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Inventory;
