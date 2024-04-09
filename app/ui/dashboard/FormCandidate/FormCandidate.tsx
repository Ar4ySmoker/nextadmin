// 'use client'
import { fetchLocation } from "@/app/lib/myData";
// import LocationSelect from "../LocationSelect/LocationSelect" 

export default  function FormCandidate({ addCandidate }) {
//  const locations = await fetchLocation();
  return <form action={addCandidate}>
    <input type="text" placeholder="name" name="name" required />
        <input type="text" placeholder="phone" name="phone" required />
        {/* <LocationSelect locations={locations} onChange={location} /> */}
        <button type="submit">Submit</button>
    </form>
}