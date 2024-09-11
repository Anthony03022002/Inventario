
export function ClientesForm() {
  return (
    <div>
      <h1>Formulario Clientes</h1>
      <form action="">
        <label htmlFor="">Tipo de identificacion</label>
        <select name="" id="">
            <option value="04">RUC</option>
            <option value="05">id</option>
            <option value="06">Pasaporte</option>
            <option value="07">Consumidor Final</option>
            <option value="08">ID Exterior</option>
        </select>
        <label htmlFor="">
            Identificacion
        </label>
        <input type="text" />
      </form>
    </div>
  )
}
