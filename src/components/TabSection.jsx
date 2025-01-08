import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const TabSection = ({ video }) => {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    setActiveTab("overview");
  }, []);

  return (
    <>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="default-tab"
          data-tabs-toggle="#default-tab-content"
          role="tablist"
        >
          <li className="me-2 block lg:hidden" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "sidebar-content"
                  ? "border-blue-500 text-blue-600 dark:text-blue-300"
                  : "border-transparent text-gray-500 dark:text-gray-400"
              }`}
              id="sidebar-content-tab"
              data-tabs-target="#sidebar-content"
              type="button"
              role="tab"
              aria-controls="sidebar-content"
              aria-selected={activeTab === "sidebar-content"}
              onClick={() => setActiveTab("sidebar-content")}
            >
              Course Content
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600 dark:text-blue-300"
                  : "border-transparent text-gray-500 dark:text-gray-400"
              }`}
              id="overview-tab"
              data-tabs-target="#overview"
              type="button"
              role="tab"
              aria-controls="overview"
              aria-selected={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </button>
          </li>
          <li className="me-2" role="presentation">
            <button
              className={`inline-block p-4 border-b-2 rounded-t-lg ${
                activeTab === "qa"
                  ? "border-blue-500 text-blue-600 dark:text-blue-300"
                  : "border-transparent text-gray-500 dark:text-gray-400"
              }`}
              id="qa-tab"
              data-tabs-target="#qa"
              type="button"
              role="tab"
              aria-controls="qa"
              aria-selected={activeTab === "qa"}
              onClick={() => setActiveTab("qa")}
            >
              Q&A
            </button>
          </li>
        </ul>
      </div>

      <div id="default-tab-content">
        {/* Sidebar content tab only visible on medium devices */}
        <div
          className={`lg:hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "sidebar-content" ? "block" : "hidden"
          }`}
          id="sidebar-content"
          role="tabpanel"
          aria-labelledby="sidebar-content-tab"
        >
          {window.innerWidth < 1024 && <Sidebar />}
        </div>

        {/* Overview Tab */}
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "overview" ? "block" : "hidden"
          }`}
          id="overview"
          role="tabpanel"
          aria-labelledby="overview-tab"
        >
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            {video.title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {video.description}
          </p>
        </div>

        {/* Q&A Tab */}
        <div
          className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${
            activeTab === "qa" ? "block" : "hidden"
          }`}
          id="qa"
          role="tabpanel"
          aria-labelledby="qa-tab"
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <strong className="font-medium text-gray-800 dark:text-white">
              Coming Soon...
            </strong>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default TabSection;
