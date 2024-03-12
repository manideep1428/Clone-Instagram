'use client'
import axios from 'axios';
import { useState } from 'react';
import { z, ZodError } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      loginSchema.parse(formData);
      const response = await axios.post("http://localhost:8080/api/v1/login", formData);
      toast.success('Login successful!'); 
      console.log('Login successful!');
      console.log(formData)
       router.push("/dashboard")
    } catch (err:any){
      if (err.response && err.response.data) {
        toast.error(err.response.data)
        console.error("Server error:", err.response.data);
      } else if (err instanceof ZodError) {
        // Handle validation errors
        const formErrors: FormErrors = {};
        err.errors.map((error) => {
          if (error.path) {
            formErrors[error.path[0]] = error.message;
          }
        });
        setErrors(formErrors);
      } else {
        // Handle other errors
        console.error("Error:", err.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-slate-900  p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {errors.email && <p className="text-red-500 mb-2">{errors.email}</p>}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full border-gray-300 rounded-md focus:ring-blue-500 text-black focus:border-blue-500 p-2 mb-4 ${errors.email ? 'border-red-500' : ''}`}
          placeholder="Email"
        />
        {errors.password && <p className="text-red-500 mb-2">{errors.password}</p>}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={`w-full border-gray-300 rounded-md focus:ring-blue-500 text-black focus:border-blue-500 p-2 mb-6 ${errors.password ? 'border-red-500' : ''}`}
          placeholder="Password"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Login
          </button>
         <h5 className='mt-4'>Create a Account?<Link href={"/v1/signup"}>Sign up</Link></h5>
      </form>
      <ToastContainer /> {/* Toast container */}
    </div>
  );
};

export default Login;
