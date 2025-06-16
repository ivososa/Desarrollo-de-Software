import httpService from "./http.service";
//const urlResource = "https://labsys.frc.utn.edu.ar/dds-backend-2025/api/articulos";
//const urlResource = "http://localhost:3000/api/articulos";
const urlResource = "https://pymes2025.azurewebsites.net/api/articulos";
// mas adelante podemos usar un archivo de configuracion para el urlResource
// import {config} from "../config";
// const urlResource = config.urlResourceArticulos;




async function Buscar(Nombre, Activo, Pagina) {
  
  const resp = await httpService.get(urlResource, {
    params: { Nombre, Activo, Pagina },
  });
  
  return resp.data;
}




async function BuscarPorId(item) {
  const resp = await httpService.get(urlResource + "/" + item.IdArticulo);
  return resp.data;
}




async function ActivarDesactivar(item) {
  await httpService.delete(urlResource + "/" + item.IdArticulo);
}




async function Grabar(item) {
  if (item.IdArticulo === 0) {
    await httpService.post(urlResource, item);
  } else {
    await httpService.put(urlResource + "/" + item.IdArticulo, item);
  }
}


const articulosService = {
  Buscar,BuscarPorId,ActivarDesactivar,Grabar
};

export default articulosService;
