import styles from "./LocationSelect.module.css";



function LocationSelect({ locations,onChange }) {
  
  return (
    <div className={styles.wrapper}>
      <select>
        <option value="">Фактическое местоположение</option>
        {locations && locations.map((location) => ( // Добавлена проверка наличия данных
          <option key={location._id} value={location._id}>
            {location.name}
          </option>
        ))}
      </select>
    </div>
  );
}


// export async function getServerSideProps() {
//   const locations = await fetchLocation();
//   return {
//     props: {
//       locations,
//     },
//   };
// }

export default LocationSelect;
