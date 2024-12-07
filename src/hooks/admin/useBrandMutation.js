import { useQueryClient, useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useBrandMutation = (mutationFn, successMessage) => {
  const querryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      querryClient.invalidateQueries("brands");
      toast.success(successMessage);
    },
    onError: () => {
      toast.error("Something went wrong");
    },
  });
};

export default useBrandMutation;
