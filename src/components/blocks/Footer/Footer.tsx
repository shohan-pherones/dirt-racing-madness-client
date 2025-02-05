"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { menus } from "../Header/Header";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content rounded p-10">
      <nav className="flex flex-wrap gap-x-4">
        {menus.map((menu) => (
          <Link key={menu.id} href={menu.route} className="link link-hover">
            {menu.label}
          </Link>
        ))}
      </nav>
      <nav>
        <div className="flex flex-wrap gap-x-4">
          <Link href="/" target="_blank">
            <FaFacebook size={20} />
          </Link>
          <Link href="/" target="_blank">
            <FaInstagram size={20} />
          </Link>
          <Link href="/" target="_blank">
            <FaTwitter size={20} />
          </Link>
        </div>
      </nav>
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All right reserved by{" "}
          <Link href="/" className="link link-hover">
            Dirt Racing Madness
          </Link>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
