
import { LocationField } from '@/app/lib/definitions'; 
import Link from 'next/link';
import { addCandidate } from "@/app/lib/myAction"

export default function Form({ locations }: { locations: LocationField[] }) {
 
  return (

    <form action={addCandidate}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <div className="mb-4">
        <label htmlFor="name" className="mb-2 block text-sm font-medium">
          Укажите Имя
          </label>
          <input
                id="name"
                name="name"
                type="text"
                placeholder="Иван Иванович Пых"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

              />
        </div>
        <div className="mb-4">
        <label htmlFor="phone" className="mb-2 block text-sm font-medium">
          Укажите Телефон
          </label>
          <input
                id="phone"
                name="phone"
                type="text"
                placeholder="+373696855446"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"

              />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="mb-2 block text-sm font-medium">
            Choose location
          </label>
          <div className="relative">
            <select
              id="location"
              name="location"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="location-error"
            >
              <option value="" disabled>
              </option>
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
          
        </div>

 
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/candidates"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <button type="submit">Create Candidate</button>
      </div>
    </form>
  );
}
