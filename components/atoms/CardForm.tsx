export default function CardForm({ tipo }: { tipo: string }) {
  const mostrarDocumento =
    tipo === "debito_falabella" || tipo === "cmr";

  return (
    <div className="tarjeta-formulario">
      <h3>
        {tipo === "credito" && "Tarjeta de crédito"}
        {tipo === "debito" && "Tarjeta de débito"}
        {tipo === "debito_falabella" && "Débito Banco Falabella"}
        {tipo === "cmr" && "Tarjeta CMR"}
      </h3>

      <label>Número de tarjeta</label>
      <input type="text" placeholder="0000 0000 0000 0000" />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Expiración</label>
          <input type="text" placeholder="MM/AA" />
        </div>
        <div>
          <label>Código de seguridad</label>
          <input type="text" placeholder="CVV" />
        </div>
      </div>

      {mostrarDocumento && (
        <>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label>Tipo de documento (titular de la tarjeta)</label>
              <select>
                <option>Cédula de Ciudadanía</option>
                <option>Cédula de Extranjería</option>
                <option>Pasaporte</option>
              </select>
            </div>
            <div>
              <label>
                {tipo === "cmr" ? "CC dueño de la tarjeta" : "Número de documento"}
              </label>
              <input type="text" />
            </div>
          </div>
        </>
      )}

      <button className="btn-agregar">Agregar</button>
      <p className="text-xs text-gray-500">
        Validaremos tu tarjeta con un cobro único de $0 o $107 que será reembolsado.
      </p>
    </div>
  );
}
