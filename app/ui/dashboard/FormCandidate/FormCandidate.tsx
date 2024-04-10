import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { LocationField } from '@/app/lib/definitions'; 
import { addCandidate } from "@/app/lib/myAction"

export default function Form({ locations }: { locations: LocationField[] }) {
 
  return (
    <div className={styles.container}>
      <form action={addCandidate} className={styles.form}>
        <input  id="name"
                name="name"
                type="text"
                placeholder="Иван Иванович Пых" required />
        <input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="+373696855446"
          required
        />
         <select
              id="location"
              name="location"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="location-error"
            >
              
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
       
        <button type="submit">Добавить кандидата</button>
      </form>
    </div>
  );
}
