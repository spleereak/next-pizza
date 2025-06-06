import {axiosInstance} from "@/services/instance";
import {Ingredient} from "@prisma/client";
import {ApiRoutes} from "@/services/constants";

export const getAll = async (): Promise<Ingredient[]> => {
  const { data } = await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS);

  return data;
}