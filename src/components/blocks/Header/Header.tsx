import Link from "next/link";

export const navLinks = [
  { id: 1, route: "/", label: "Home" },
  { id: 2, route: "/events", label: "Events" },
];

const Header = () => {
  const renderNavLinks = () => {
    return navLinks.map((navLink) => (
      <li key={navLink.id}>
        <Link href={navLink.route}>{navLink.label}</Link>
      </li>
    ));
  };

  return (
    <header className="navbar bg-base-300">
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
            {renderNavLinks()}
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Dirt Racing Madness
        </Link>
      </nav>
      <nav className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{renderNavLinks()}</ul>
      </nav>
      <nav className="navbar-end">
        <Link href="/sign-in" className="btn btn-primary">
          Sign In
        </Link>
      </nav>
    </header>
  );
};

export default Header;
