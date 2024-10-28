import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { useAuth } from '@/context/AuthContext';
import { useLogin } from '@/features/useLogin';
import { useRouter } from 'next/navigation';


const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const router = useRouter()
  const {mutate,isPending,isError,error} = useLogin({
    onSuccess: (data) => {
        console.log(data)
        login(data.accessToken,data.refreshToken); 
        router.push('/admin')

    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        mutate(values);  
        console.log(values)
      } catch (error) {
        console.error('Error during login:', error);
      }
    },
  });

  return (
    <div className=" p-6">
    <h2 className="text-2xl font-bold text-center mb-6">Login Admin</h2>
    <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className={`mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${
                    formik.touched.username && formik.errors.username ? 'border-red-500' : ''
                }`}
            />
            {formik.touched.username && formik.errors.username && (
                <div className="text-red-500 text-sm">{formik.errors.username}</div>
            )}
        </div>
        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className={`mt-1 block w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500 ${
                    formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                }`}
            />
            {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
            )}
        </div>
        <button
            type="submit"
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
                isPending ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isPending}
        >
            {isPending ? 'Loading...' : 'Login'}
        </button>
        {isError && <div className="text-red-500 text-center">{error?.message}</div>}
    </form>
</div>
  );
};

export default LoginForm;
