'use client'
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { updateCandidate } from "@/app/lib/myAction";

const handleUpdateCandidate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await updateCandidate(formData);
  };
  
export default function UpdateForm({ candidate, locations }) {
    return (
      <div className={styles.container}>
        <form onSubmit={handleUpdateCandidate} className={styles.form}>
        <input type="hidden" name="_id" value={candidate._id} />

        <input
  id="name"
  name="name"
  type="text"
  defaultValue={candidate.name} // Используйте defaultValue вместо placeholder
  required
/>

<input
  id="phone"
  name="phone"
  type="text"
  defaultValue={candidate.phone} // Используйте defaultValue вместо placeholder
  required
/>

<select id="location" name="location" defaultValue={candidate.location} required>
  {locations.map((location) => (
    <option key={location._id} value={location._id}>
      {location.name}
    </option>
  ))}
</select>

          <button type="submit">Обновить кандидата</button>
        </form>
      </div>
    );
  }
  