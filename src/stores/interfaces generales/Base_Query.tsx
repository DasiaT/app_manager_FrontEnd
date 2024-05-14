import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { obtenerDatosUsuario } from "../../components_generals/user_datos";

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_JS_APP_API_URL + "/api",
    prepareHeaders: (headers) => {
      const isLoggedIn = obtenerDatosUsuario();
  
      headers.set("Authorization", `Bearer ${isLoggedIn?.token}`);
  
      return headers;
    }
  });