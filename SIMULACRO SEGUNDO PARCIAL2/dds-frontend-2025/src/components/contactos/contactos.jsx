import React, { useState, useEffect } from "react";
import moment from "moment";
import ContactosBuscar from "./ContactosBuscar";
import ContactosListado from "./ContactosListado";
import ContactosRegistro from "./ContactosRegistro";
import contactosService from "../../services/contactos.service";
import categoriasService from "../../services/categorias.service";
import modalDialogService from "../../services/modalDialog.service";

function Contactos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };
  const [AccionABMC, setAccionABMC] = useState("L");

  const [Nombre, setNombre] = useState("");

  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  const [Categorias, setCategorias] = useState(null);

  // cargar categorías al montar el componente
  useEffect(() => {
    async function BuscarCategorias() {
      let data = await categoriasService.Buscar();
      setCategorias(data);
    }
    BuscarCategorias();
  }, []);

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }

    const data = await contactosService.Buscar(Nombre, _pagina);
    setItems(data.Items);
    setRegistrosTotal(data.RegistrosTotal);

    // generar array de páginas para el paginador
    const arrPaginas = [];
    for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 10); i++) {
      arrPaginas.push(i);
    }
    setPaginas(arrPaginas);
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await contactosService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    BuscarPorId(item, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdContacto: 0,
      Nombre: '',
      FechaNacimiento: moment(new Date()).format("YYYY-MM-DD"),
      Telefono: '',
      IdCategoria: '',
      ImporteContribucion: '',
    });
  }

  function Imprimir() {
    window.print();
  }

  async function Eliminar(item) {
    modalDialogService.Confirm(
      "¿Está seguro que quiere eliminar el registro?",
      undefined,
      undefined,
      undefined,
      async () => {
        await contactosService.Eliminar(item);
        await Buscar();
      }
    );
  }

  async function Grabar(item) {
    try {
      await contactosService.Grabar(item);
    } catch (error) {
      modalDialogService.Alert(error?.response?.data?.message ?? error.toString());
      return;
    }
    await Buscar();
    Volver();

    setTimeout(() => {
      modalDialogService.Alert(
        "Registro " +
          (AccionABMC === "A" ? "agregado" : "modificado") +
          " correctamente."
      );
    }, 0);
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Contactos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ContactosBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <ContactosListado
          Items={Items}
          Consultar={Consultar}
          Modificar={Modificar}
          Eliminar={Eliminar}
          Imprimir={Imprimir}
          Pagina={Pagina}
          RegistrosTotal={RegistrosTotal}
          Paginas={Paginas}
          Buscar={Buscar}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesmodalDialogService.Alert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <ContactosRegistro
          AccionABMC={AccionABMC}
          Categorias={Categorias}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
  );
}

export { Contactos };