import httpService from "./http.service";
const urlResource = "http://localhost:3000/api/contactos";

async function Buscar(Nombre, Pagina) {
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Pagina },
  });
  return resp.data;
}

async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdContacto);
  return resp.data;
}

async function Eliminar(item) {
  await httpService.delete(urlResource + "/" + item.IdContacto);
}

async function Grabar(item) {
  if (item.IdContacto === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdContacto, item);
  }
}

const contactosService = {
  Buscar,
  BuscarPorId,
  Eliminar,
  Grabar
};

export default contactosService;