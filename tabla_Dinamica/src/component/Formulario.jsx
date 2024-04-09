import React, { useState } from 'react';

const Formulario = ({ onSubmit, user }) => {
 const [nombre, setNombre] = useState(user ? user.nombre : '');
 const [apellido, setApellido] = useState(user ? user.apellido : '');

 const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ nombre, apellido, id: user ? user.id : null });
 };

 return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <button type="submit" className="btn btn-primary mt-4">{user ? "Guardar cambios" : "Insertar Registro"}</button>
    </form>
 );
};

export default Formulario;
