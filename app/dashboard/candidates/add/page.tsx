import { fetchDocument, fetchLangue, fetchLocation, fetchManager, fetchProfession, fetchStatus} from "@/app/lib/myData";
import Form from "@/app/ui/dashboard/FormCandidate/FormCandidate";

export default async function Page() {
  const locations = await fetchLocation();
  const professions = await fetchProfession();
  const documents = await fetchDocument();
  const langue = await fetchLangue();
  const status = await fetchStatus();
  const manager = await fetchManager();
  


  return (
      <main>
          <Form 
        locations={locations}
        professions={professions}
        documents={documents} 
        langue={langue} 
        status={status} 
        manager={manager} />
      </main>
  );
}