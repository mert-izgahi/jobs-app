import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

function useUpdateProfile() {
    const queryClient = useQueryClient();
    const { mutate: updateProfile, isPending: isLoadingUpdateProfile } =
        useMutation({
            mutationKey: ["updateProfile"],
            mutationFn: async (args: any) => {
                try {
                    const response = await axios.put("/api/auth/me", args);
                    const data = await response.data;

                    return data.result;
                } catch (error) {
                    console.log(error);
                }
            },

            onSuccess: () => {
                toast.success("Profile updated successfully");

                queryClient.invalidateQueries({
                    queryKey: ["currentUser"],
                });
            },

            onError: () => {
                toast.error("Failed to update profile");
            },
        });

    return {
        updateProfile,
        isLoadingUpdateProfile,
    };
}

export default useUpdateProfile;
