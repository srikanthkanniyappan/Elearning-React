const Services = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[85vh] bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
      <p className="mt-4 text-lg text-gray-600 text-center max-w-xl">
        We offer a variety of services to help you achieve your educational
        goals. Our platform is designed for:
      </p>
      <ul className="mt-6 space-y-2 text-gray-700">
        <li className="flex items-start">
          <span className="mr-2 text-blue-500">✔️</span>
          <span>Tailored Learning Experiences</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-blue-500">✔️</span>
          <span>Interactive Content and Quizzes</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-blue-500">✔️</span>
          <span>Progress Tracking and Reporting</span>
        </li>
        <li className="flex items-start">
          <span className="mr-2 text-blue-500">✔️</span>
          <span>Collaboration Tools for Teachers and Students</span>
        </li>
      </ul>
      <p className="mt-6 text-lg text-gray-600">
        Join us to unlock your potential and make learning fun and engaging!
      </p>
    </div>
  );
};

export default Services;
