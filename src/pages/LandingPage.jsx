import React, { useEffect } from "react";
import { Navigate, NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import Aos from "aos";
import "aos/dist/aos.css";

const LandingPage = () => {
  const isAuthenticated = localStorage.getItem("access_token") !== null;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);
  return (
    <div className="bg-gray-100">
      <section className="px-6 pt-36 dark:bg-gray-900 md:px-0">
        <div className="container max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div
              className="w-full md:w-1/2 md:px-3 max-w-full"
              data-aos="fade-up"
            >
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="inline-block whitespace-nowrap">
                    Build Your Skills{" "}
                  </span>
                  <span className="inline whitespace-nowrap text-blue-600">
                    With Our Courses
                  </span>
                </h1>
                <p className="mx-auto text-base text-gray-500 dark:text-gray-300 sm:max-w-md lg:text-xl md:max-w-3xl">
                  Unlock your potential with expert-led courses in programming,
                  web development, and data science.
                </p>
                <div className="relative flex flex-col sm:flex-row sm:space-x-4">
                  <NavLink
                    to="/courses"
                    className="flex items-center w-full max-w-60 px-6 py-3 mb-3 text-lg text-white bg-blue-600 rounded-md sm:mb-0 hover:bg-blue-700 sm:w-auto md:text-sm	lg:text-lg"
                  >
                    Explore Courses
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 ml-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="flex items-center max-w-60 px-6 py-3 md:text-sm	lg:text-lg text-gray-600 bg-gray-300 rounded-md hover:bg-gray-400 hover:text-gray-700"
                  >
                    Learn More
                  </NavLink>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 max-w-full" data-aos="fade-up">
              <div className="w-full h-auto overflow-hidden rounded-md shadow-xl sm:rounded-xl">
                <img
                  src="/assets/images/landing.jpg"
                  alt="Courses"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full pt-7 pb-7 md:pt-20 md:pb-24">
        <div className="box-border flex flex-col items-center content-center px-8 mx-auto leading-6 text-black border-0 border-gray-300 border-solid md:flex-row max-w-7xl lg:px-16">
          <div
            className="max-w-full box-border relative w-full px-4 mt-5 mb-4 -ml-5 text-center bg-no-repeat bg-contain border-solid md:ml-0 md:mt-0 md:max-w-none lg:mb-0 md:w-1/2 xl:pl-10"
            data-aos="fade-up"
          >
            <img
              src="/assets/images/learning-experience.png"
              alt="Online Learning"
              className="p-2 pl-6 pr-5 xl:pl-16 xl:pr-20"
            />
          </div>
          <div
            className="max-w-full box-border order-first w-full text-black border-solid md:w-1/2 md:pl-10 md:order-none"
            data-aos="fade-up"
          >
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
              Enhance Your Learning Experience
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-12 xl:pr-32 lg:text-lg">
              Unlock a world of knowledge with our expertly designed courses and
              personalized learning pathways.
            </p>
            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
              <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-blue-600 rounded-full">
                  <span className="text-sm font-bold">✓</span>
                </span>{" "}
                Flexible learning schedules
              </li>
              <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-blue-600 rounded-full">
                  <span className="text-sm font-bold">✓</span>
                </span>{" "}
                Access to expert instructors
              </li>
              <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-blue-600 rounded-full">
                  <span className="text-sm font-bold">✓</span>
                </span>{" "}
                Interactive learning tools
              </li>
            </ul>
          </div>
        </div>

        <div className="box-border flex flex-col items-center content-center px-8 mx-auto mt-2 leading-6 text-black border-0 border-gray-300 border-solid md:mt-20 xl:mt-0 md:flex-row max-w-7xl lg:px-16">
          <div
            className="box-border w-full max-w-full text-black border-solid md:w-1/2 md:pl-6 xl:pl-32"
            data-aos="fade-up"
          >
            <h2 className="m-0 text-xl font-semibold leading-tight border-0 border-gray-300 lg:text-3xl md:text-2xl">
              Streamlined Course Management
            </h2>
            <p className="pt-4 pb-8 m-0 leading-7 text-gray-700 border-0 border-gray-300 sm:pr-10 lg:text-lg">
              Simplify your learning journey with easy-to-use tools and progress
              tracking for all your courses.
            </p>
            <ul className="p-0 m-0 leading-6 border-0 border-gray-300">
              <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-blue-600 rounded-full">
                  <span className="text-sm font-bold">✓</span>
                </span>{" "}
                Seamless course enrollment
              </li>
              <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-blue-600 rounded-full">
                  <span className="text-sm font-bold">✓</span>
                </span>{" "}
                Progress and performance tracking
              </li>
              <li className="box-border relative py-1 pl-0 text-left text-gray-500 border-solid">
                <span className="inline-flex items-center justify-center w-6 h-6 mr-2 text-white bg-blue-600 rounded-full">
                  <span className="text-sm font-bold">✓</span>
                </span>{" "}
                Certification upon completion
              </li>
            </ul>
          </div>
          <div
            className="max-w-full box-border relative w-full px-4 mt-10 mb-4 text-center bg-no-repeat bg-contain border-solid md:mt-0 md:max-w-none lg:mb-0 md:w-1/2"
            data-aos="fade-up"
          >
            <img
              src="/assets/images/course-management.png"
              alt="Course Management"
              className="pl-4 sm:pr-10 xl:pl-10 lg:pr-32"
            />
          </div>
        </div>
      </section>
      <section className="py-7">
        <div className="container items-center max-w-6xl px-4 mx-auto sm:px-20 md:px-32 lg:px-16">
          <div className="flex flex-wrap items-center -mx-3">
            <div
              className="max-w-full order-0 w-full px-3 lg:w-1/2 lg:order-0"
              data-aos="fade-up"
            >
              <div className="w-full lg:max-w-md">
                <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl font-heading">
                  Unlock Your Learning Potential with Our Powerful Tools
                </h2>
                <p className="mb-4 font-medium tracking-tight text-gray-400 xl:mb-6">
                  Build your knowledge, enhance your skills, and stay ahead in
                  your career with our comprehensive course platform. Here’s
                  what we offer:
                </p>
                <ul>
                  <li className="flex items-center py-2 space-x-4 xl:py-3">
                    <svg
                      className="w-8 h-8 text-pink-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      ></path>
                    </svg>
                    <span className="font-medium text-gray-500">
                      Interactive Learning Features
                    </span>
                  </li>
                  <li className="flex items-center py-2 space-x-4 xl:py-3">
                    <svg
                      className="w-8 h-8 text-yellow-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      ></path>
                    </svg>
                    <span className="font-medium text-gray-500">
                      Track Your Progress and Milestones
                    </span>
                  </li>
                  <li className="flex items-center py-2 space-x-4 xl:py-3">
                    <svg
                      className="w-8 h-8 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                    <span className="font-medium text-gray-500">
                      Secure Platform with Data Protection
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="w-full max-w-full px-3 mb-12 lg:w-1/2 order-1 lg:order-0 lg:mb-0"
              data-aos="fade-up"
            >
              <img
                className="mx-auto sm:max-w-sm lg:max-w-full"
                src="/assets/images/learning-platform.png"
                alt="Learning Platform"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default LandingPage;
