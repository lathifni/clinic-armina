import axios from 'axios';
import { baseUrl } from '@/lib/baseUrl';

const axiosInstance = axios.create({
    baseURL: baseUrl,
});

// Interceptor untuk menangani token
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor untuk menangani respon
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Jika token akses kadaluarsa (misalnya status 401)
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Tandai bahwa kita sudah mencoba menyegarkan token

            // Ambil refresh token dari penyimpanan
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    // Kirim permintaan untuk menyegarkan token
                const response = await axiosInstance.post('api/user/refresh', { refreshToken });

                    const { accessToken, refreshToken: newRefreshToken } = response.data;

                    // Simpan token baru di localStorage
                    localStorage.setItem('token', accessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    // Setel token akses baru ke permintaan asli
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

                    return axios(originalRequest); // Ulangi permintaan asli
                } catch (refreshError) {
                    // Jika penyegaran token gagal, redirect ke halaman login atau tampilkan pesan error
                    console.error('Token refresh failed:', refreshError);
                    // Redirect atau logika penanganan error lain
                }
            }
        }
        return Promise.reject(error);
    }
);

export  {axiosInstance};
