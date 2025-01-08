import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const navbarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const isAuthenticated = localStorage.getItem("access_token") !== null;
  const [lastScrollTop, setLastScrollTop] = useState(0);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.classList.contains("hidden") &&
        !mobileMenuRef.current.contains(event.target) &&
        !menuButtonRef.current.contains(event.target) &&
        !navbarRef.current.contains(event.target)
      ) {
        closeMobileMenu();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll =
        window.pageYOffset || document.documentElement.scrollTop;

      if (currentScroll > 50) {
        if (currentScroll > lastScrollTop) {
          if (navbarRef.current)
            navbarRef.current.style.transform = "translateY(-150%)";
        } else {
          if (navbarRef.current)
            navbarRef.current.style.transform = "translateY(0)";
        }
      } else {
        if (navbarRef.current)
          navbarRef.current.style.transform = "translateY(0)";
      }

      setLastScrollTop(currentScroll <= 0 ? 0 : currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.classList.toggle("hidden");
    }
  };

  const closeMobileMenu = () => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.classList.contains("hidden")
    ) {
      mobileMenuRef.current.classList.add("hidden");
    }
  };

  return (
    <nav
      ref={navbarRef}
      className="bg-white border-gray-200 dark:bg-gray-900 fixed w-full z-20 top-0 transition-transform"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 -960 960 960"
            fill="#1c64f2"
          >
            <path d="M480-120 200-272v-240L40-600l440-240 440 240v320h-80v-276l-80 44v240L480-120Zm0-332 274-148-274-148-274 148 274 148Zm0 241 200-108v-151L480-360 280-470v151l200 108Zm0-241Zm0 90Zm0 0Z" />
          </svg>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            E-Learning
          </span>
        </NavLink>

        <div className="flex md:order-2 space-x-4 md:space-x-4 rtl:space-x-reverse">
          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                onClick={closeMobileMenu}
                className="text-blue-600 bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2 transition-colors duration-200 ease-in-out hidden sm:block"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={closeMobileMenu}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 sm:px-6 py-2 transition-colors duration-200 ease-in-out"
              >
                Signup
              </NavLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 sm:px-6 py-2 transition-colors duration-200 ease-in-out"
            >
              Logout
            </button>
          )}
          <button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-cta"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          ref={mobileMenuRef}
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {isAuthenticated ? (
              <>
                <li>
                  <NavLink
                    to="/dashboard"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 md:p-0 text-gray-900 rounded ${
                        isActive
                          ? "bg-blue-600 text-white md:text-blue-600 md:bg-white"
                          : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                    aria-current="page"
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-courses"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 md:p-0 text-gray-900 rounded ${
                        isActive
                          ? "bg-blue-600 text-white md:text-blue-600 md:bg-white"
                          : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/my-courses"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 md:p-0 text-gray-900 rounded ${
                        isActive
                          ? "bg-blue-600 text-white md:text-blue-600 md:bg-white"
                          : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    My Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 md:p-0 text-gray-900 rounded ${
                        isActive
                          ? "bg-blue-600 text-white md:text-blue-600 md:bg-white"
                          : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to="/courses"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 md:p-0 text-gray-900 rounded ${
                        isActive
                          ? "bg-blue-600 text-white md:text-blue-600 md:bg-white"
                          : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    Courses
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 md:p-0 text-gray-900 rounded ${
                        isActive
                          ? "bg-blue-600 text-white md:text-blue-600 md:bg-white"
                          : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/services"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 md:p-0 text-gray-900 rounded ${
                        isActive
                          ? "bg-blue-600 text-white md:text-blue-600 md:bg-white"
                          : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    Services
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 md:p-0 text-gray-900 rounded ${
                        isActive
                          ? "bg-blue-600 text-white md:text-blue-600 md:bg-white"
                          : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="block sm:hidden">
                  <NavLink
                    to="/login"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `block py-2 px-3 md:p-0 text-gray-900 rounded ${
                        isActive
                          ? "bg-blue-600 text-white md:text-blue-600 md:bg-white"
                          : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-600 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                      }`
                    }
                  >
                    Login
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
