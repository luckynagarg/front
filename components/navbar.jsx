import Image from "next/image";
import Logo from "@/public/Logo.png";

const Navbar = () => {
  return (
    <nav className="h-16 bg-black/60 backdrop-blur-md text-white px-4 flex items-center">
      <Image
        src={Logo}
        alt="Logo"
        className="h-14 w-auto object-contain"
        priority
      />
        <ul className="ml-auto flex items-center gap-4">
          <li>
            <a href="#" className="hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </li>
        </ul>
    </nav>
  );
};

export default Navbar;