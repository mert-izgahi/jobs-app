import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useCurrentUser() {
    const { data: currentUser, isLoading: isLoadingCurrentUser } = useQuery({
        queryKey: ["currentUser"],
        queryFn: async () => {
            const response = await axios.get("/api/auth/me");
            const data = await response.data;

            return data;
        },
    });

    return { currentUser, isLoadingCurrentUser };
}

export default useCurrentUser;
