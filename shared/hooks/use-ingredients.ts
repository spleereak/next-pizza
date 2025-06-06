import React from "react";
import {Ingredient} from "@prisma/client";
import {Api} from "@/services/api-client";

interface ReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useIngredients = (): ReturnProps => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchIngredients() {
      try {
        const response = await Api.ingredients.getAll();
        setIngredients(response);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return { ingredients, loading };
}