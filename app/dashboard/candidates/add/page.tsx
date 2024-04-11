import { fetchLocation, fetchProfession} from "@/app/lib/myData";
import Form from "@/app/ui/dashboard/FormCandidate/FormCandidate";

export default async function Page() {
  const locations = await fetchLocation();
  const professions = await fetchProfession()


  return (
      <main>
          <Form 
          locations={locations} 
          professions={professions} />
      </main>
  );
}