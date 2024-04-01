import { useState } from "react";

import PageSizeSelector from "./PageSizeSelector";
import TableBody from "./TableBody";

const Table = () => {
  const [dato, setDato] = useState([
    { id: 1, nombre: "Juan", apellido: "Pérez" },
    { id: 2, nombre: "Ana", apellido: "García" },
    { id: 3, nombre: "Carlos", apellido: "Martínez" },
    { id: 4, nombre: "Maria", apellido: "Lopez" },
    { id: 5, nombre: "Pedro", apellido: "Rodriguez" },
    { id: 6, nombre: "Laura", apellido: "Gonzalez" },
    { id: 7, nombre: "Jorge", apellido: "Fernandez" },
    { id: 8, nombre: "Sofia", apellido: "Ramirez" },
    { id: 9, nombre: "Luis", apellido: "Morales" },
    { id: 10, nombre: "Carmen", apellido: "Sanchez" },
    { id: 11, nombre: "Ricardo", apellido: "Torres" },
    { id: 12, nombre: "Patricia", apellido: "Mendoza" },
    { id: 13, nombre: "Hector", apellido: "Ruiz" },
    { id: 14, nombre: "Isabel", apellido: "Vargas" },
    { id: 15, nombre: "Raul", apellido: "Guerrero" },
    { id: 16, nombre: "Liliana", apellido: "Ochoa" },
    { id: 17, nombre: "Ruben", apellido: "Rios" },
    { id: 18, nombre: "Mariana", apellido: "Cardenas" },
    { id: 19, nombre: "Sergio", apellido: "Guerrero" },
    { id: 20, nombre: "Carolina", apellido: "Ramirez" },
  ]);

  const [Busqueda, setBusqueda] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const datosFiltrados = dato.filter((item) =>
    item.nombre.toLowerCase().includes(Busqueda.toLowerCase())
  );

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = datosFiltrados.slice(startIndex, endIndex);

  const handlePageSizeChange = (e) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setDato(dato.filter((user) => user.id !== id));
  };

  return (
    <div>
      <PageSizeSelector value={pageSize} onChange={handlePageSizeChange} />
      <TableBody data={currentData} onDelete={handleDelete} />
      <div>
        <h3>
          Mostrando {currentData.length} de {datosFiltrados.length}
        </h3>
      </div>
    </div>
  );
};

export default Table;
