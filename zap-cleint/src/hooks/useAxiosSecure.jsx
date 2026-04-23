import { useEffect } from "react";
import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

const noopLogout = () => Promise.resolve();

const useAxiosSecure = () => {
    const { authInfo } = useAuth();
    const user = authInfo?.user ?? null;
    const logOut = authInfo?.logOut ?? noopLogout;
    const navigate = useNavigate();

    useEffect(() => {
        const interceptor = axiosSecure.interceptors.request.use(async (config) => {
            const token =
                typeof user?.getIdToken === "function" ? await user.getIdToken() : null;

            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            } else if (config?.headers?.Authorization) {
                delete config.headers.Authorization;
            }

            return config;
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error?.response?.status;
                if (status === 401 || status === 403) {
                    try {
                        await logOut();
                    } catch (logoutError) {
                        console.error("Error during logout:", logoutError);
                    } finally {
                        navigate("/login", { replace: true });
                    }
                }
                throw error;
            }
        );

        return () => {
            axiosSecure.interceptors.request.eject(interceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [user, logOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
