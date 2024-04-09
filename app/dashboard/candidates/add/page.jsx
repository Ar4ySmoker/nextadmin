// 'use client'
import { addCandidate } from "../../../lib/myAction";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { notFound } from "next/navigation";
async function getData(){
  const res = await fetch("http://localhost:3000/api/locations")
if(!res.ok) return notFound();
return res.json();
}

const AddCandidatePage = async () => {
  const data = await getData()


  return (
    <div className={styles.container}>
      <form action={addCandidate} className={styles.form}>
        <input type="text" placeholder="name" name="name" required />
        <input type="text" placeholder="phone" name="phone" required />
        <div className={styles.wrapper}>
      <select>
        <option value="">Фактическое местоположение</option>
        {data.map((location) => (
          <option key={location._id} value={location._id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default AddCandidatePage

// const AddCandidatePage = () => {

//   return (
//    <>
//    <FormCand/>
//    </>
//   );
// };
// export default AddCandidatePage;