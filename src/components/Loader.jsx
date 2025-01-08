import React from "react";

const Loader = () => {
  return (
    <div className="h-screen grid place-items-center font-sans bg-gray-100">
      <div className="relative h-[220px] w-[220px] grid place-items-center">
        <div className="[transform-style:preserve-3d] animate-bouncing">
          <div className="[transform-style:preserve-3d] rotate-x-[45deg] rotate-z-[45deg] animate-rotation">
            <div className="relative h-20 w-20 [transform-style:preserve-3d] origin-top-left [transform:translateZ(-40px)]">
              <div className="absolute inset-0 bg-blue-600 border border-gray-200 [transform:translateZ(-80px)] animate-bouncing-shadow"></div>
              <div className="absolute inset-0 bg-blue-600 border border-gray-200 [transform:translateZ(80px)]"></div>
              <div className="absolute inset-0 bg-blue-600 border border-gray-200 [transform-origin:0_50%] [transform:rotateY(-90deg)]"></div>
              <div className="absolute inset-0 bg-blue-600 border border-gray-200 [transform-origin:0_50%] [transform:rotateY(-90deg)_translateZ(-80px)]"></div>
              <div className="absolute inset-0 bg-blue-600 border border-gray-200 [transform-origin:50%_0] [transform:rotateX(-90deg)_translateY(-80px)]"></div>
              <div className="absolute inset-0 bg-blue-600 border border-gray-200 [transform-origin:50%_0] [transform:rotateX(-90deg)_translateY(-80px)_translateZ(80px)]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
