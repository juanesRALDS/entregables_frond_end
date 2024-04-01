const TableBody = ({ data, onDelete }) => (
  <table>
     <thead className="container">
       <tr>
         <th>ID</th>
         <th>Nombre</th>
         <th>Apellido</th>
         <th>Acciones</th>
       </tr>
     </thead>
     <tbody>
       {data.map((event) => (
         <tr key={event.id}>
           <td>{event.id}</td>
           <td>{event.nombre}</td>
           <td>{event.apellido}</td>
           <td>
             <button onClick={() => onDelete(event.id)}>Eliminar</button>
           </td>
         </tr>
       ))}
     </tbody>
  </table>
 );
 

export default TableBody;
