import { Candidate } from "@/app/lib/models";
import { fetchCandidates } from "@/app/lib/myData";
import { fetchLocation } from "@/app/lib/myData";
import UpdateForm from "@/app/ui/dashboard/FormCandidate/FormCandidateUpdate";
export default async function UpdatePage({ params }) {
  const candidateId = params.id; // Получение ID кандидата из URL
  const candidate = await Candidate.findById(candidateId);
  const locations = await fetchLocation();

  return (
    <main>
      <UpdateForm candidate={candidate} locations={locations} />
    </main>
  );
}
