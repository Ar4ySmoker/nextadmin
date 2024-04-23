'use client'
import React, { useState } from 'react';
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

export default function Form({ professions, locations, langue, status, manager }) {
  const [documentEntries, setDocumentEntries] = useState([]);

  const addDocumentEntry = () => {
    setDocumentEntries([...documentEntries, { docType: '', dateExp: '', numberDoc: '' }]);
  };

  const handleDocumentChange = (index, field, value) => {
    const newEntries = [...documentEntries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    setDocumentEntries(newEntries);
  };

  const removeDocumentEntry = (index) => {
    const newEntries = documentEntries.filter((_, i) => i !== index);
    setDocumentEntries(newEntries);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Submitting with documents:', documentEntries);
    const formData = new FormData(event.target);
    const body = {
      name: formData.get('name'),
      age: formData.get('age'),
      phone: formData.get('phone'),
      profession: formData.get('profession'),
      locations: formData.get('locations'),
      documents: documentEntries,
      experience: formData.get('experience'),
      drivePermis: formData.get('drivePermis'),
      leaving: formData.get('leaving'),
      cardNumber: formData.get('cardNumber'),
      workHours: formData.get('workHours'),
      langue: formData.get('langue'),
      status: formData.get('status'),
      manager: formData.get('manager'),
      comment: formData.get('comment')
    };

    try {
      const response = await fetch('/api/addCandidate', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const result = await response.json();
      if (response.ok) {
        console.log('User created:', result);
      } else {
        console.error('Failed to create user:', result);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input id="name" name="name" type="text" placeholder="Имя кандидата" required />
        <input id="age" name="age" type="text" placeholder="Возраст" />
        <input id="phone" name="phone" type="text" placeholder="+373696855446" required />
        
        <select id="profession" name="profession">
          {professions.map(profession => (
            <option key={profession._id} value={profession._id}>{profession.name}</option>
          ))}
        </select>

        <select id="locations" name="locations">
          {locations.map(location => (
            <option key={location._id} value={location._id}>{location.name}</option>
          ))}
        </select>

        {documentEntries.map((doc, index) => (
          <div key={index}>
            <select value={doc.docType} onChange={e => handleDocumentChange(index, 'docType', e.target.value)}>
              <option value="Виза">Виза</option>
              <option value="Песель">Песель</option>
              <option value="Паспорт">Паспорт</option>
              <option value="Карта побыту">Карта побыту</option>
            </select>
            <input type="date" value={doc.dateExp} onChange={e => handleDocumentChange(index, 'dateExp', e.target.value)} />
            <input type="text" value={doc.numberDoc} onChange={e => handleDocumentChange(index, 'numberDoc', e.target.value)} />
            <button type="button" onClick={() => removeDocumentEntry(index)}>Удалить</button>
          </div>
        ))}
        <button type="button" onClick={addDocumentEntry}>Добавить документ</button>

        <select id="langue" name="langue">
          {langue.map(l => (
            <option key={l._id} value={l._id}>{l.name}</option>
          ))}
        </select>

        <select id="status" name="status">
          {status.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>

        <select id="manager" name="manager">
          {manager.map(m => (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>
        
        <input id="cardNumber" name="cardNumber" type="text" placeholder="Номер счёта" />
        <textarea id="comment" name="comment" placeholder="Комментарий" />

        <button type="submit">Добавить кандидата</button>
      </form>
    </div>
  );
}
