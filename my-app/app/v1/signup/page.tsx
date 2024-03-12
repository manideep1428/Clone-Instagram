'use client'
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/navigation'; // Correct import
import { useState } from 'react';
import { z, ZodError } from 'zod';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS

const schema = z.object({
  username: z.string().min(4, "Username must be >4"),
  name: z.string().min(3, "Name must be > 3 letters"),
  email: z.string().email(),
  password: z.string().min(8, "Password contian 8 letters,Numbers or anything")
});

type FormValues = z.infer<typeof schema>;

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormValues>({
    username: '',
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      schema.parse(formData);
      console.log('Form data:', formData);
      const response = await axios.post("http://localhost:8080/api/v1/signup", formData)
      console.log(response.data)
      toast.success("Account created successfully")
      // Display success message
      router.push("/v1/login")
    } catch (err: any) {
      console.error(err);
      if (err instanceof ZodError) {
        toast.error(err.errors[0]?.message || 'Validation error');
        setError(err.errors[0]?.message || 'Validation error');
      } else {
        toast.error('An error occurred');
        setError('An error occurred');
      }
    }
  };

  return (
    <div className="min-h-screen bg-white-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Head>
        <title>Sign Up - Instawhite</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="mx-auto h-12 w-auto" src="/instawhite-logo.png" alt="Instawhite" />
        <h2 className="mt-6 text-center text-xl font-bold text-white-100">Sign up to see photos and videos from your friends.</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-grey-500 py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white-700">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-2 block text-black bg-slate-300 w-full border-white-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white-700">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 block text-black bg-slate-300 w-full border-white-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 block text-black bg-slate-300 w-full border-white-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 block text-black bg-slate-300 w-full border-white-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <button type="submit" className=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Sign Up
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SignUpPage;
