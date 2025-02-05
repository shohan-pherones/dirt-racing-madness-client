"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export const menus = [
  { id: 1, route: "/", label: "Home" },
  { id: 2, route: "/events", label: "Events" },
];

const NavLinks = () => {
  return menus.map((menu) => (
    <li key={menu.id}>
      <Link href={menu.route}>{menu.label}</Link>
    </li>
  ));
};

const Header = () => {
  const { authState, logout } = useAuth();

  return (
    <header className="navbar bg-base-300 sticky top-0 left-0 z-50">
      <nav className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLinks />
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          {!authState.user?.id ? (
            <span>Dirt Racing Madness</span>
          ) : (
            <span>
              Welcome back,{" "}
              <span className="text-accent">
                {authState.user.name.split(" ")[0]}!
              </span>
            </span>
          )}
        </Link>
      </nav>
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <NavLinks />
        </ul>
      </nav>
      <nav className="navbar-end">
        {!authState.user?.id ? (
          <Link href="/sign-in" className="btn btn-primary">
            Sign In
          </Link>
        ) : (
          <button className="btn btn-accent" onClick={logout}>
            Log Out
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
