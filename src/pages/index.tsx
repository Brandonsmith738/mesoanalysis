import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Radar from "~/components/Radar";
import { SignIn, SignInButton, useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";

import { api } from "~/utils/api";

const Navbar = () => {
  const user = useUser();
  return (
    // <nav className="navbar absolute flex w-full flex-wrap items-center justify-between p-6">
    //   <div className="mr-6 flex flex-shrink-0 items-center text-white">
    //     <span className="text-xl font-semibold tracking-tight">
    //       Meso Predictions
    //     </span>
    //   </div>
    //   <div className="block lg:hidden">
    //     <button className="flex items-center rounded border border-gray-600 px-3 py-2 text-gray-500 hover:border-white hover:text-white">
    //       <svg
    //         className="h-3 w-3 fill-current"
    //         viewBox="0 0 20 20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <title>Menu</title>
    //         <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    //       </svg>
    //     </button>
    //   </div>
    //   <div className="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
    //     <div className="text-sm lg:flex-grow">
    //       <Link href="/">
    //         <p className="mt-4 mr-4 block font-semibold text-gray-200 hover:text-white lg:mt-0 lg:inline-block">
    //           Home
    //         </p>
    //       </Link>
    //       <Link href="/about">
    //         <p className="mt-4 mr-4 block font-semibold text-gray-200 hover:text-white lg:mt-0 lg:inline-block">
    //           About
    //         </p>
    //       </Link>
    //       <Link href="/contact">
    //         <p className="mt-4 mr-4 block font-semibold text-gray-200 hover:text-white lg:mt-0 lg:inline-block">
    //           Contact
    //         </p>
    //       </Link>
    //     </div>
    //     <div>
    //       {!user.isSignedIn && <SignInButton />}
    //       {user.isSignedIn && <SignOutButton />}
    //     </div>
    //   </div>
    // </nav>
    <div className="navbar absolute sm:px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn-ghost btn-circle btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
          >
            <li>
              <a>Homepage</a>
            </li>
            <li>
              <a>Portfolio</a>
            </li>
            <li>
              <a>About</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          Meso Predictions
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn-ghost btn-circle btn hidden sm:visible sm:mx-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        {user.isSignedIn && (
          <div className="btn-accent btn">
            <SignOutButton />
          </div>
        )}
        {!user.isSignedIn && (
          <div className="btn-accent btn">
            <SignInButton />
          </div>
        )}
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const allPosts = api.posts.getAll.useQuery();
  console.log(allPosts);

  const user = useUser();
  return (
    <>
      <Head>
        <title>Meso Predictions</title>
        <meta name="description" content="Meso Predictions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!user.isSignedIn && (
          <div className="flex h-screen w-full flex-col items-center justify-center">
            <h1 className="font-mono text-lg font-semibold sm:text-4xl">
              Hello, Welcome to Meso Predictions.
            </h1>
            <h1 className="font-mono text-lg font-semibold sm:text-4xl">
              Please sign in to get started.
            </h1>
          </div>
        )}
        {user.isSignedIn && <Radar />}
      </main>
    </>
  );
};

export default Home;
