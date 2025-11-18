import { QUERY_KEYS } from "@/constant";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "@/services/settings.service";

export const useGetSettings = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.SETTINGS],
    queryFn: getSettings,
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => updateSettings(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SETTINGS] });
    },
  });
};
