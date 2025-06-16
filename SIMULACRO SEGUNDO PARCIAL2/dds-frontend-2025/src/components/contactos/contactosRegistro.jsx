import { useForm } from "react-hook-form";

export default function ContactosRegistro({
  AccionABMC,
  Categorias,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          
          {/* campo Nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 5,
                    message: "Nombre debe tener al menos 5 caracteres",
                  },
                  maxLength: {
                    value: 50,
                    message: "Nombre debe tener como máximo 50 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* campo FechaNacimiento */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaNacimiento">
                Fecha Nacimiento<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaNacimiento", {
                  required: { 
                    value: true, 
                    message: "Fecha de nacimiento es requerida" 
                  }
                })}
                className={
                  "form-control " + (errors?.FechaNacimiento ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaNacimiento?.message}
              </div>
            </div>
          </div>

          {/* campo Telefono */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Telefono">
                Teléfono<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Telefono", {
                  required: { value: true, message: "Teléfono es requerido" },
                  pattern: {
                    value: /^[0-9]{7,20}$/,
                    message: "Teléfono debe ser numérico y entre 7 y 20 dígitos",
                  },
                })}
                className={
                  "form-control " + (errors?.Telefono ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.Telefono?.message}
              </div>
            </div>
          </div>

          {/* campo IdCategoria */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdCategoria">
                Categoría<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdCategoria", {
                  required: { value: true, message: "Categoría es requerida" },
                })}
                className={
                  "form-control " +
                  (errors?.IdCategoria ? "is-invalid" : "")
                }
              >
                <option value="" key={1}></option>
                {Categorias?.map((x) => (
                  <option value={x.IdCategoria} key={x.IdCategoria}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                {errors?.IdCategoria?.message}
              </div>
            </div>
          </div>

          {/* campo ImporteContribucion */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ImporteContribucion">
                Importe Contribución<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                step="0.01"
                {...register("ImporteContribucion", {
                  required: { 
                    value: true, 
                    message: "Importe de contribución es requerido" 
                  },
                  min: {
                    value: 0.01,
                    message: "Importe debe ser mayor a 0",
                  },
                  max: {
                    value: 9999999.99,
                    message: "Importe debe ser menor o igual a 9999999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.ImporteContribucion ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.ImporteContribucion?.message}
              </div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Cancelar"}
            </button>
          </div>
        </div>

        {/* texto: Revisar los datos ingresados... */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}
      </div>
    </form>
  );
}