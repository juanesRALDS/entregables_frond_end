

const TableBody = ({ data }) => (
 <table>
    <thead className="container">
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>apellido</th>
      </tr>
    </thead>
    <tbody>
      {data.map((event) => (
        <tr key={event.id}>
          <td>{event.id}</td>
          <td>{event.nombre}</td>
          <td>{event.apellido}</td>
        </tr>
      ))}
    </tbody>
 </table>
);

export default TableBody;
