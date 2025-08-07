import apiRequest from "@/shared/model/api/config";
import { ICatalogParams, ICatalogResponse } from "./types";

export const getCatalog = async (params?: ICatalogParams) => {
  return apiRequest<ICatalogResponse>("GET", "/catalog", { params });
}