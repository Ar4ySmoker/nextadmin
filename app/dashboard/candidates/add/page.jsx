import DropdownDefault from "@/app/ui/dashboard/Dropdowns/DropdownDefault";
import { addCandidate } from "../../../lib/myAction";
import { featchLocation } from "../../../lib/myData";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import Dropdown from "@/app/ui/dashboard/SelectGroup/SelectProfessionPrimary";

const [locations, setLocations] = useState<{ name: string | null; id: string; }[]>([]);
const [selectedLocation, setSelectedLocation] = useState(null);
useEffect(() => {
  async function fetchLocations() {
    try {
      const locationsData = await getLocationlist("");
      setLocations(locationsData);
    } catch (error) {
      console.error("Failed to fetch locations:", error);
    }
  }

  fetchLocations();
}, []);
const AddCandidatePage = () => {
  // const locations = [...featchLocation()].map(location => location.name);

  const locations = featchLocation([{}, "name"])
 
  console.log(locations)
  return (
    <div className={styles.container}>
      <form action={addCandidate} className={styles.form}>
        <input type="text" placeholder="name" name="name" required />
        <input type="text" placeholder="phone" name="phone" required />
        <input type="text" placeholder="location" name="location"  />
        {/* <select name="location">
    <option value="">Select location</option>
    {locations.map((locationName, index) => (
        <option key={index} value={locationName}>{locationName}</option>
    ))}
</select> */}
{/* <DropdownDefault/> */}
<SelectGroupOne/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default AddCandidatePage;
