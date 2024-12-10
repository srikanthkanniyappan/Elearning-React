import React from "react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Introduction to Programming",
    description: "Learn the basics of programming to build problem-solving.",
    link: "/courses/1",
    image: "/assets/images/coding.jpg",
  },
  {
    id: 2,
    title: "Web Development Essentials",
    description: "An introductory course on HTML, CSS, and JavaScript.",
    link: "/courses/2",
    image: "/assets/images/webdevelopment.jpg",
  },
  {
    id: 3,
    title: "Data Science Fundamentals & ML",
    description: "Get started with data analysis and visualization.",
    link: "/courses/3",
    image: "/assets/images/ml.jpg",
  },
];


const Courses = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-10">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">
        Explore Our Courses
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-12 max-w-2xl text-center">
        Find a course that fits your learning goals. From programming to data science, we have something for everyone.
      </p>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-6 max-w-6xl">
        {courses.map((course) => (
          <Link to={course.link} key={course.id} className="transform transition duration-300 hover:scale-105">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {course.description}
                </p>
                <span className="text-blue-600 dark:text-blue-400 ">
                  Learn More →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Courses;
