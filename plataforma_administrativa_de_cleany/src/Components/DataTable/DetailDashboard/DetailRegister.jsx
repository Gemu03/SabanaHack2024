import React, { useEffect, useState } from "react";



const DetailRegister = () => {
  const [register, setRegister] = useState(null);

  useEffect(() => {
    const storedRegister = localStorage.getItem("register_selected");
    if (storedRegister) {
      setRegister(JSON.parse(storedRegister));
    }
  }, []);

  if (!register) {
    return <div>No data available</div>;
  }

  const {
    id,
    nombre,
    cargo,
    fechaHora,
    duracion,
    evaluacion,
    promedioDuracionPorgesto,
  } = register;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detalle del Registro</h1>
      <div className="mb-4">
        <p>
          <strong>ID del Usuario:</strong> {id}
        </p>
        <p>
          <strong>Nombre del Usuario:</strong> {nombre}
        </p>
        <p>
          <strong>Cargo del Usuario:</strong> {cargo}
        </p>
        <p>
          <strong>Fecha y Hora del Lavado:</strong> {fechaHora}
        </p>
        <p>
          <strong>Duración del Lavado (seg):</strong> {duracion}
        </p>
        <p>
          <strong>Promedio de Duración por Gesto (seg):</strong>{" "}
          {promedioDuracionPorgesto}
        </p>
        <p>
          <strong>Evaluación Final:</strong> {evaluacion}
        </p>
      </div>
    </div>
  );
};

export default DetailRegister;
