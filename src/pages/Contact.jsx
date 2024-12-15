import React from "react";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="bg-gray-100 pt-24">
      <div className="h-full flex justify-center items-center">
        <div className="w-full max-w-6xl px-4">
          <div className="grid lg:grid-cols-3 gap-6 items-center">
            <div className="max-w-lg mx-auto text-center lg:text-left lg:mb-0 mb-6">
              <h2 className="text-4xl font-extrabold text-gray-800">
                Contact Us
              </h2>
              <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                Got questions or need assistance? Our team is here to help you
                with any inquiries or opportunities.
              </p>

              <form className="mx-auto mt-8 bg-white rounded-lg p-6 shadow-md space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none"
                />
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-md h-12 px-6 bg-[#f0f1f2] text-sm outline-none"
                />
                <textarea
                  placeholder="Your Message"
                  rows="6"
                  className="w-full rounded-md px-6 bg-[#f0f1f2] text-sm pt-3 outline-none resize-none"
                ></textarea>
                <button
                  type="button"
                  className="text-gray-800 bg-blue-200 hover:bg-blue-300 font-semibold rounded-md text-sm px-6 py-3 block w-full"
                >
                  Send Message
                </button>
              </form>
            </div>

            <div className="relative lg:col-span-2">
              <img
                src="/assets/images/contact.png"
                className="w-full max-w-xl object-contain block mx-auto"
                alt="Contact Image"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
