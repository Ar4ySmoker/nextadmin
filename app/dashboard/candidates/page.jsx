// import { fetchCandidates } from "../../lib/myData"; 
// import Pagination from "../../ui/dashboard/pagination/pagination";
// import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { deleteCandidate } from "@/app/lib/myAction";
import { notFound } from "next/navigation";

// async function getData(){
//   const res = await fetch("http://localhost:3000/api/candidates")
// if(!res.ok) return notFound();
// return res.json();
// }
async function getData() {
  try {
    const candidatesRes = await fetch("http://localhost:3000/api/candidates");
    const locationsRes = await fetch("http://localhost:3000/api/locations");

    if (!candidatesRes.ok || !locationsRes.ok) return notFound();

    const candidates = await candidatesRes.json();
    const locations = await locationsRes.json();

    // Создаем объект для быстрого доступа к данным о локациях по их _id
    const locationsMap = {};
    locations.forEach(location => {
      locationsMap[location._id] = location.name;
    });

    // Добавляем поле locationName к каждому кандидату
    candidates.forEach(candidate => {
      candidate.locationName = locationsMap[candidate.location] || "Не указано";
    });

    return candidates;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}


   


const CandidatesPage = async () => {
  // const q = searchParams?.q || "";
  // const page = searchParams?.page || 1;
  // const { count, candidates } = await fetchCandidates(q, page);
const data = await getData()
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* <Search placeholder="Search for a Candidates..." /> */}
        <Link href="/dashboard/candidates/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
            <td>Document</td>
          </tr>
        </thead>
        <tbody>
          {data.map((candidate) => (
            <tr key={candidate.id}>
              <td>
                <div className={styles.user}>
                  {/* <Image
                    src={user.img || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  /> */}
                  {candidate.name}
                </div>
              </td>
              <td>{candidate.phone}</td>
              <td>{candidate.createdAt?.toString().slice(4, 16)}</td>
              <td>{candidate.locationName}</td>
              <td>{candidate.isActive ? "active" : "passive"}</td>
              <td>{candidate.document}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/candidates/${candidate._id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
                    </button>
                  </Link>
                  <form action={deleteCandidate}>
                    <input type="hidden" name="id" value={(candidate._id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Delete
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default CandidatesPage;
