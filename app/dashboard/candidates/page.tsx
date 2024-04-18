'use client'

import React, { useState, useEffect } from 'react';
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { deleteCandidate } from "@/app/lib/myAction";
import { Candidate } from '@/app/lib/definitions';

function CandidatesPage() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  // Функция для загрузки данных API
  async function fetchDataFromApi() {
    try {
      const endpoints = ["candidates", "profession", "locations","document", "manager", "status", "langue"];
      const baseUrl = "http://localhost:3000/api/";
      const responses = await Promise.all(
        endpoints.map(endpoint => fetch(baseUrl + endpoint))
      );

      if (responses.some(response => !response.ok)) {
        throw new Error('Failed to fetch some endpoints');
      }

      const [candidates, profession, locations, document, manager, status, langue] = await Promise.all(
        responses.map(response => response.json())
      );
      
const locationMap = Object.fromEntries(locations.map((loc: { _id: any; name: any; }) => [loc._id, loc.name]));
const professionMap = Object.fromEntries(profession.map((prof: { _id: any; name: any; }) => [prof._id, prof.name]));
const documentMap = Object.fromEntries(document.map((dcm: { _id: any; name: any; }) => [dcm._id, dcm.name]));
const managerMap = Object.fromEntries(manager.map((mng: { _id: any; name: any; }) => [mng._id, mng.name]));
const statusMap = Object.fromEntries(status.map((st: { _id: any; name: any; }) => [st._id, st.name]));
const langueMap = Object.fromEntries(langue.map((lng: { _id: any; name: any; }) => [lng._id, lng.name]));
      return candidates.map((candidate: { location: string | number; profession: string | number; document: string | number; manager: string | number; status: string | number; langue: string | number; }) => ({
        ...candidate,
        locationName: locationMap[candidate.location] || "Не указано",
        professionName: professionMap[candidate.profession] || "Без профессии",
        documentName: documentMap[candidate.document] || "Не заполнено",
        managerName: managerMap[candidate.manager] || "Без менеджера",
        statusName: statusMap[candidate.status] || "Не обработан",
        langueName: langueMap[candidate.langue] || "Не знает"
      }));
      
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    fetchDataFromApi().then(setCandidates);
  }, []);
  const handleDeleteCandidate = async (candidateId: any) => {
    const isDeleted = await deleteCandidate(candidateId);
    if (isDeleted) {
      setCandidates(prevCandidates => prevCandidates.filter(c => c._id !== candidateId));
    }
  };
  const handleOpenModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCandidate(null);
  };
  const handleSearchChange = (event: { target: { value: string; }; }) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchTerm) ||
    candidate.phone.includes(searchTerm) ||
    candidate.locationName.toLowerCase().includes(searchTerm) ||
    candidate.professionName.toLowerCase().includes(searchTerm)
  );

  return (
    
    <div className="overflow-x-auto">
        <div className={styles.top}>
        <input
          type="text"
          placeholder="Search for a Candidate..."
          value={searchTerm}
          onChange={handleSearchChange}
          className={styles.searchInput}
        />
        <Link href="/dashboard/candidates/add">
          <button className={styles.addButton}>Добавить кандидата</button>
        </Link>
      </div>
  <table className="table">
    
    {/* head */}
    <thead>
      <tr>
        
        <th>Имя</th>
        <th>Телефон</th>
        <th>Профессия</th>
        <th>Добавлен</th>
        <th>Документы</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {filteredCandidates.map(candidate => (
            <tr key={candidate._id}>
              <td>
          <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{candidate.name}</div>
              <div className="text-sm opacity-50">В городе {candidate.locationName}</div>
            </div>
          </div>
              </td>
              <td>{candidate.phone}</td>
              <td>
              <div className="flex items-center gap-3">
            <div>
              <div className="font-bold">{candidate.professionName}</div>
              <div className="text-sm opacity-50">Опыт {candidate.experience}</div>
            </div>
          </div>
              </td>
              <td>{candidate.createdAt?.substring(0, 10)}</td>
              <td>{candidate.document}</td>
              
              <td>
         <div className={styles.buttons}>
           <Link href={`/dashboard/candidates/${candidate._id}`}>
             <button className={`${styles.button} ${styles.view}`}>
               Редактировать
             </button>
           </Link>
           <div className={styles.buttons}>
                  <button className={`${styles.button} ${styles.view}`} onClick={() => handleOpenModal(candidate)}>
                    Подробнее
                  </button>
                </div>
         </div>
       </td>
            </tr>
            
            
          ))}
     

     
    </tbody>
    {/* foot */}
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot>
    
  </table>
  {/* Модальное окно */}
{modalOpen && (
  <dialog className="modal" open>
    <div className="modal-box bg-white">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={handleCloseModal}>✕</button>
      <h3 className="font-bold text-lg">Информация о кандидате</h3>
      <div className="py-4">
      <p><strong>Менеджер:</strong> {selectedCandidate.managerName}</p>
        <p><strong>Имя:</strong> {selectedCandidate.name}</p>
        <p><strong>Возраст:</strong> {selectedCandidate.age}</p>
        <p><strong>Телефон:</strong> {selectedCandidate.phone}</p>
        <p><strong>Профессия:</strong> {selectedCandidate.professionName}</p>
        <p><strong>Город:</strong> {selectedCandidate.locationName}</p>
        <p><strong>Добавлен:</strong> {selectedCandidate.createdAt?.substring(0, 10)}</p>
        <p><strong>Документы:</strong> {selectedCandidate.documentName}</p>
        <p><strong>Статус:</strong> {selectedCandidate.statusName}</p>
        <p><strong>Язык:</strong> {selectedCandidate.langueName}</p>
        <p><strong>Водительское Удостоверение:</strong> {selectedCandidate.drivePermis}</p>
        <p><strong>Готов выехать:</strong> {typeof selectedCandidate.leaving === 'string' ? selectedCandidate.leaving.substring(0, 10) : 'Неизвестно'}</p>
        <p><strong>Комментарий:</strong> {selectedCandidate.comment}</p>

      </div>
    </div>
  </dialog>
)}

</div>
  );
}

export default CandidatesPage;
