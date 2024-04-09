import React, { useState, useMemo } from "react";
import TableBody from "./TableBody";
import Modal from "./Modal";
import Formulario from "./Formulario";
import PageSizeSelector from "./PageSizeSelector";

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

  //estados
  
  // Estado para controlar la visibilidad del modal de éxito de edición
  const [isEditSuccessModalOpen, setIsEditSuccessModalOpen] = useState(false);

  // Estado para controlar la visibilidad del modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Estado para almacenar el usuario que se está editando
  const [userToEdit, setUserToEdit] = useState(null);

  // Estado para almacenar el término de búsqueda
  const [Busqueda, setBusqueda] = useState("");

  // Estado para controlar la visibilidad del modal de éxito de registro
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Estado para controlar la visibilidad del modal de confirmación de eliminación
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  // Estado para almacenar el usuario que se va a eliminar
  const [userToDelete, setUserToDelete] = useState(null);

  // Estado para controlar la página actual en la paginación
  const [currentPage, setCurrentPage] = useState(1);

  // Estado para controlar el tamaño de página en la paginación
  const [pageSize, setPageSize] = useState(10);

  // Estado para almacenar el próximo ID a asignar a un nuevo usuario
  const [nextId, setNextId] = useState(21); // Asumiendo que el último id es 20

  // Estado para controlar la visibilidad del modal de registro
  const [isModalOpen, setIsModalOpen] = useState(false);



    // Filtra la lista de usuarios basándose en el término de búsqueda, ignorando mayúsculas y minúsculas.
  const datosFiltrados = dato.filter((item) =>
  item.nombre.toLowerCase().includes(Busqueda.toLowerCase())
  );

  // Calcula el número total de páginas necesarias para mostrar todos los usuarios filtrados,
  // basándose en el tamaño de página actual. 
  const nPages = Math.ceil(datosFiltrados.length / pageSize);

  // Utiliza useMemo para optimizar el rendimiento al calcular los datos que se mostrarán en la página actual.
  // Esto evita recalculaciones innecesarias cada vez que se renderiza el componente.
  const currentData = useMemo(() => {
  const firstPageIndex = (currentPage - 1) * pageSize;
  const lastPageIndex = firstPageIndex + pageSize;
  return datosFiltrados.slice(firstPageIndex, lastPageIndex);
  }, [datosFiltrados, currentPage, pageSize]);

  // Función para abrir el modal de registro, cambiando el estado para mostrarlo.
  const handleOpenModal = () => {
  setIsModalOpen(true);
  };

  // Función para cerrar el modal de registro, cambiando el estado para ocultarlo.
  const handleCloseModal = () => {
  setIsModalOpen(false);
  };

  // Función para cerrar el modal de éxito de registro, cambiando el estado para ocultarlo.
  const handleCloseSuccessModal = () => {
  setIsSuccessModalOpen(false);
  };

  // Función para abrir el modal de confirmación de eliminación, estableciendo el usuario a eliminar.
  const handelDelite = (id) => {
  setUserToDelete(id);
  setIsDeleteConfirmModalOpen(true);
  };

  // Función para confirmar la eliminación de un usuario, actualizando la lista de usuarios y cerrando el modal de confirmación.
  const confirmDelete = () => {
  setDato(dato.filter((user) => user.id !== userToDelete));
  setIsDeleteConfirmModalOpen(false);
  };

  // Función para manejar el envío del formulario de registro, añadiendo un nuevo usuario a la lista y actualizando el estado correspondiente.
  const handleSubmitForm = (newData) => {
  const newItem = { id: nextId, ...newData };
  setDato([...dato, newItem]);
  setIsModalOpen(false);
  setIsSuccessModalOpen(true);
  setNextId(nextId + 1);
  };

  // Función para abrir el modal de edición, estableciendo el usuario a editar.
  const handelEdit = (user) => {
  setUserToEdit(user);
  setIsEditModalOpen(true);
  };

  // Función para manejar el envío del formulario de edición, actualizando el usuario en la lista y abriendo el modal de confirmación de edición.
  const handleEditSubmit = (updatedUser) => {
  setDato(
    dato.map((user) =>
      user.id === updatedUser.id ? { ...user, ...updatedUser } : user
    )
  );
  setIsEditModalOpen(false);
  setIsEditSuccessModalOpen(true); // Abre el modal de confirmación de edición
  };

  // Función para manejar el cambio de tamaño de página en la paginación, actualizando el tamaño de página y reiniciando la página actual a 1.
  const handlePageSizeChange = (e) => {
  setPageSize(parseInt(e.target.value));
  setCurrentPage(1);
  };


  return (
    <div>
      <input
        type="text"
        placeholder="Buscar"
        value={Busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <TableBody data={currentData} onDelite={handelDelite} onEdit={handelEdit}/>
            
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <Formulario onSubmit={handleSubmitForm} />
      </Modal>
      <Modal isOpen={isSuccessModalOpen} onClose={handleCloseSuccessModal}>
        <div className="modal-header">
          <h5 className="modal-title">Éxito</h5>
        </div>
        <div className="modal-body">
          <p>El usuario ha sido registrado exitosamente.</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={handleCloseSuccessModal}
          >
            Cerrar
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={() => setIsDeleteConfirmModalOpen(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title">Confirmar eliminación</h5>
        </div>
        <div className="modal-body">
          <p>¿Estás seguro de que quieres eliminar este usuario?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => setIsDeleteConfirmModalOpen(false)}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={confirmDelete}
          >
            Eliminar
          </button>
        </div>
      </Modal>
      <PageSizeSelector value={pageSize} onChange={handlePageSizeChange} />
      <button onClick={handleOpenModal} className="btn btn-primary m-4">
        Nuevo
      </button>
      <div>
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      >
        <div className="modal-header">
          <h5 className="modal-title">Editar Usuario</h5>
        </div>
        <div className="modal-body">
          <Formulario onSubmit={handleEditSubmit} user={userToEdit} />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cerrar
          </button>
        </div>
      </Modal>
        <div>
          <Modal isOpen={isEditSuccessModalOpen} onClose={() => setIsEditSuccessModalOpen(false)}>
            <div className="modal-header">
                <h5 className="modal-title">Éxito</h5>
            </div>
            <div className="modal-body">
                <p>El usuario ha sido editado exitosamente.</p>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditSuccessModalOpen(false)}>
                    Cerrar
                </button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Table;
