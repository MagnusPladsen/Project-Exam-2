import { Link } from "react-router-dom";
import Logo from "../logo/Logo.component";

function Footer() {
  return (
    <footer className="bg-primary mt-10">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            to="https://holidaze.pladsen.dev/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <Logo />
          </Link>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 ">
            <li>
              <Link to="/about" className="hover:underline me-4 md:me-6">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-white sm:text-center ">
          © 2023{" "}
          <Link to="https://holidaze.pladsen.dev/" className="hover:underline">
            Holidaze™
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
export default Footer;
