import { QUERY_KEYS } from "@/constant";
import { SubCategoryFormValues } from "@/schemas/sub-category.schema";
import {
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
  getSubCategories,
} from "@/services/sub-category.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SubCategoryFormValues) => createSubCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUBCATEGORIES] });
    },
  });
};

export const useGetSubCategories = () => {
  return useQuery<SubCategory[]>({
    queryKey: [QUERY_KEYS.SUBCATEGORIES],
    queryFn: () => getSubCategories(),
  });
};

export const useDeleteSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSubCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUBCATEGORIES] });
    },
  });
};

export const useUpdateSubCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      name,
      parentCategory,
    }: {
      id: string;
      name: string;
      parentCategory: string;
    }) => updateSubCategory(id, { name, parentCategory }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SUBCATEGORIES] });
    },
  });
};
