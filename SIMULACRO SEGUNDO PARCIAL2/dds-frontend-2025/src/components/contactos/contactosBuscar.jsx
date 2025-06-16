import React from "react";
import { useForm } from "react-hook-form";

export default function ContactosBuscar({ Nombre, setNombre, Buscar, Agregar }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    Buscar(1);
  };

  return (
    <form name="FormBusqueda" onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-4 col-md-2">
            <label className="col-form-label">Nombre:</label>
          </div>
          <div className="col-sm-8 col-md-4">
            <input
              type="text"
              className="form-control"
              {...register("Nombre")}
              onChange={(e) => setNombre(e.target.value)}
              value={Nombre}
              maxLength="50"
              autoFocus
            />
          </div>
        </div>

        <hr />

        {/* Botones */}
        <div className="row">
          <div className="col text-center botones">
            <button type="submit" className="btn btn-primary">
              <i className="fa fa-search"> </i> Buscar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => Agregar()}
            >
              <i className="fa fa-plus"> </i> Agregar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}