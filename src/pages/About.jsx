import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-8">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="mt-4 text-lg text-gray-600">
            We are dedicated to providing high-quality online education for
            everyone.
          </p>
        </header>

        {/* Mission Section */}
        <section className="text-center bg-blue-100 p-6 rounded-lg mb-12 shadow-lg">
          <h2 className="text-3xl font-semibold text-blue-800 mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            Our mission is to empower learners through accessible and engaging
            online courses that foster personal and professional growth.
          </p>
        </section>

        {/* Features Section */}
        <section className="text-center bg-green-100 p-6 rounded-lg mb-12 shadow-lg">
          <h2 className="text-3xl font-semibold text-green-800 mb-4">
            Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-700">
                Interactive Courses
              </h3>
              <p className="text-gray-500">
                Engage with multimedia content and interactive assessments.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-700">
                Expert Instructors
              </h3>
              <p className="text-gray-500">
                Learn from industry experts with real-world experience.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-bold text-gray-700">
                Flexible Learning
              </h3>
              <p className="text-gray-500">
                Study at your own pace, anytime and anywhere.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="text-center bg-purple-100 p-6 rounded-lg mb-12 shadow-lg">
          <h2 className="text-3xl text-center font-semibold text-purple-800 mb-4">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="John Doe"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-gray-700">John Doe</h3>
              <p className="text-gray-500">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
              <img
                src="https://randomuser.me/api/portraits/women/1.jpg"
                alt="Jane Smith"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-gray-700">Jane Smith</h3>
              <p className="text-gray-500">Head of Content</p>
            </div>
            {/* Team Member 3 */}
            <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="Alice Johnson"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold text-gray-700">Alice Johnson</h3>
              <p className="text-gray-500">Chief Technology Officer</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
