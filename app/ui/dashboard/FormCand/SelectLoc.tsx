import React from 'react';
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { fetchLocation } from "@/app/lib/myData";

const SelectLoc = ({ onSelectLocation }) => {
  const handleLocationChange = (event) => {
    const selectedLocation = event.target.value;
    onSelectLocation(selectedLocation);
  };

  const renderLocations = async () => {
    const locations = await fetchLocation();

    return (
      <select className={styles.wrapper} name="location" onChange={handleLocationChange}>
        <option value="">Фактическое местоположение</option>
        {locations.map((location) => (
          <option key={location._id} value={location._id}>
            {location.name}
          </option>
        ))}
      </select>
    );
  };

  'use client'
  return (
    <div className={styles.wrapper}>
      {renderLocations()}
    </div>
  );
};

export default SelectLoc;
