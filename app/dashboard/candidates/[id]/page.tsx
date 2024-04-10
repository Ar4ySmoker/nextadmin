import { updateCandidate } from "@/app/lib/myAction";
import { fetchCandidates } from "@/app/lib/myData";
import styles from "@/app/ui/dashboard/products/singleProduct/singleProduct.module.css";
import Image from "next/image";

const SingleCandidatePage = async ({ params }) => {
  const { id } = params;
  const candidate = await fetchCandidates(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src="/noavatar.png" alt="" fill />
        </div>
        
      </div>
      <div className={styles.formContainer}>
        <form action={updateCandidate} className={styles.form}>
          <input type="hidden" name="id" value={candidate.id} />
          <label>Name</label>
          <input type="text" name="name" placeholder={candidate.name} />
          <label>Phone</label>
          <input type="text" name="phone" placeholder={candidate.phone} />
          <label>location</label>
         
          <button>Update</button>
        </form>
      </div>
    </div>
  );
};

export default SingleCandidatePage;
