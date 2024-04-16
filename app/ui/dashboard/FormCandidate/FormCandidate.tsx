'use client'
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";


export default function Form({ professions, locations, documents, langue, status, manager }) {
  

  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращение стандартного поведения формы
  
    // Создание объекта FormData и получение данных из формы
    const formData = new FormData(event.target);
    const body = {
      name: formData.get('name'),
      age: formData.get('age'),
      phone: formData.get('phone'),
      profession: formData.get('profession'),
      location: formData.get('location'),
      document: formData.get('document'),
      experience: formData.get('experience'),
      drivePermis: formData.get('drivePermis'),
      leaving: formData.get('leaving'),
      cardNumber: formData.get('cardNumber'),
      workHours: formData.get('workHours'),
      langue: formData.get('langue'),
      status: formData.get('status'),
      manager: formData.get('manager'),
      comment: formData.get('workHours')
    };
  
    try {
      // Отправка данных на ваш API-роут
      const response = await fetch('/api/addCandidate', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      const result = await response.json();
  console.log("response", response)
      if (response.ok) {
        console.log('User created:', result);
        
        // Обработка успешного создания пользователя, например, очистка формы или сообщение пользователю
      } else {
        console.error('Failed to create user:', result);
        // Обработка ошибок, например, вывод сообщения об ошибке
      }
    } catch (error) {
      console.error('Network error:', error);
      // Обработка сетевых ошибок
    }
  };
  
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
      <input  id="name"
                name="name"
                type="text"
                placeholder="Иван Иванович Пых" required />
      <input  id="age"
                name="age"
                type="text"
                placeholder="Возраст"  />
      <input
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="+373696855446"
          required
        />
<select
              id="profession"
              name="profession"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="profession-error"
            >
              
              {professions.map((profession) => (
                <option key={profession._id} value={profession._id}>
                  {profession.name}
                </option>
              ))}
            </select>
            <input  id="experience"
                name="experience"
                type="text"
                placeholder="Опыт работы по професии"  />  
          <input  id="drivePermis"
                name="drivePermis"
                type="text"
                placeholder="Категории В/У в наличии"  />                         
          <input  id="leaving"
                name="leaving"
                type="date"
                 /> 
          <input  id="workHours"
                name="workHours"
                type="text"
                placeholder="Часы отработки"
                 />                  
         <select
              id="location"
              name="location"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="location-error"
            >
              
              {locations.map((location) => (
                <option key={location._id} value={location._id}>
                  {location.name}
                </option>
              ))}
            </select>
            <select
              id="document"
              name="document"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="document-error"
            >
              
              {documents.map((document) => (
                <option key={document._id} value={document._id}>
                  {document.name}
                </option>
              ))}
            </select>  
            <select
              id="langue"
              name="langue"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="langue-error"
            >
              
              {langue.map((langue) => (
                <option key={langue._id} value={langue._id}>
                  {langue.name}
                </option>
              ))}
            </select>   
            <select
              id="status"
              name="status"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="status-error"
            >
              
              {status.map((status) => (
                <option key={status._id} value={status._id}>
                  {status.name}
                </option>
              ))}
            </select>  
            <select
              id="manager"
              name="manager"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="manager-error"
            >
              
              {manager.map((manager) => (
                <option key={manager._id} value={manager._id}>
                  {manager.name}
                </option>
              ))}
            </select> 
            <input  id="comment"
                name="comment"
                type="text"
                placeholder="Оставьте комментарий"
                 />  
        <button type="submit">Добавить кандидата</button>
      </form>
    </div>
  );
}
// export default function Form({ 
//   professions,
//   locations,
//   documents,
//   langue,
//   status,
//   manager,
//   }: { 
//   locations: LocationField[], 
//   professions: ProfessionField[],
//   documents: DocumentField[],
//   langue: LocationField[],
//   status: StatusField[],
//   manager: ManagerField[],
// }) {
//   console.log("Locations:", locations);
//   console.log("Professions:", professions);
//   console.log("Documents:",documents );
//   console.log("Langue:",langue);
//   console.log("Managers:", manager)
//   console.log("Status:", status);
//   return (
//     <div className={styles.container}>
//       <form action={addCandidate} className={styles.form}>
//         <input  id="name"
//                 name="name"
//                 type="text"
//                 placeholder="Иван Иванович Пых" required />
//         <input
//                       id="phone"
//                       name="phone"
//                       type="text"
//                       placeholder="+373696855446"
//           required
//         />
// <select
//               id="profession"
//               name="profession"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//               aria-describedby="profession-error"
//             >
              
//               {professions.map((profession) => (
//                 <option key={profession._id} value={profession._id}>
//                   {profession.name}
//                 </option>
//               ))}
//             </select>

//          <select
//               id="location"
//               name="location"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//               aria-describedby="location-error"
//             >
              
//               {locations.map((location) => (
//                 <option key={location._id} value={location._id}>
//                   {location.name}
//                 </option>
//               ))}
//             </select>
//             <select
//               id="document"
//               name="document"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//               aria-describedby="document-error"
//             >
              
//               {documents.map((document) => (
//                 <option key={document._id} value={document._id}>
//                   {document.name}
//                 </option>
//               ))}
//             </select>  
//             <select
//               id="langue"
//               name="langue"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//               aria-describedby="langue-error"
//             >
              
//               {langue.map((langue) => (
//                 <option key={langue._id} value={langue._id}>
//                   {langue.name}
//                 </option>
//               ))}
//             </select>   
//             <select
//               id="status"
//               name="status"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//               aria-describedby="status-error"
//             >
              
//               {status.map((status) => (
//                 <option key={status._id} value={status._id}>
//                   {status.name}
//                 </option>
//               ))}
//             </select>  
//             <select
//               id="manager"
//               name="manager"
//               className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//               defaultValue=""
//               aria-describedby="manager-error"
//             >
              
//               {manager.map((manager) => (
//                 <option key={manager._id} value={manager._id}>
//                   {manager.name}
//                 </option>
//               ))}
//             </select> 
//         <button type="submit">Добавить кандидата</button>
//       </form>
//     </div>
//   );
// }
