"use client";
import query from "@/constants/query-keys";
import { AuthService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAuth() {
  const logoutMutation = useMutation({ mutationFn: AuthService.logout });
  const { data } = useQuery({
    queryKey: query.me,
    queryFn: AuthService.me,
  });

  const isAuth = !!data?.data;

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();

    if (logoutMutation.isSuccess) {
      localStorage.removeItem("access_token");
    }
    // Clear the access token from local storage
    // Optionally, redirect to the login page or perform other logout actions
    window.location.href = "/auth/login";
  };

  return { handleLogout, isAuth };
}
