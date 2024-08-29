import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Register: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Register</title>
      </Head>
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div>
              <label htmlFor="first-name" className="sr-only">First Name</label>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                className="relative block w-full appearance-none px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="sr-only">Last Name</label>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                className="relative block w-full appearance-none px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>
          <div>
            <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Register
            </button>
          </div>
        </form>
        <div className="text-sm text-gray-600">
          Already have an account? 
          
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
