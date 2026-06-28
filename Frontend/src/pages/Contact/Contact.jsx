import React, { useRef } from "react";
import emailjs from "emailjs-com";
import contactImage from "../../assets/ayurveda-hero.jpg"; 

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4afv4cg",
        "template_dtfqelt",
        form.current,
        "L5vdTvl73yqsAvnMb"
      )
      .then(
        (result) => {
          alert("✅ Message sent successfully!");
          e.target.reset();
        },
        (error) => {
          alert("❌ Something went wrong. Try again!");
          console.error(error.text);
        }
      );
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center py-24 px-4 font-sans text-gray-900"
      style={{
        backgroundImage: `url(${contactImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-6xl w-full lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start backdrop-blur-sm bg-white/40 p-8 rounded-3xl shadow-xl">


        {/* Contact Form */}
        <div >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 mb-6">
            Send Us a Message
          </h2>

          <form
            ref={form}
            onSubmit={sendEmail}
            className="space-y-6 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 p-8 rounded-2xl shadow-lg"
          >
            <div>
              <label className="block text-gray-900 font-medium mb-2" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="user_name"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg border border-purple-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="user_email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-purple-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-gray-900 font-medium mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-lg border border-purple-300 focus:ring-2 focus:ring-pink-400 focus:border-transparent"
                required
              ></textarea>
            </div>

            <button
                type="submit"
                className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition-all transform hover:scale-105"
            >
            Send Message
            </button>

          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 lg:mt-0">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Contact Info
          </h2>
          <div className="space-y-6">

            {/* Email */}
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-purple-700 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0l4-4m0 8l-4-4m12 4v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6"></path>
              </svg>
              <p className="text-gray-800">deepakdesh565@gmail.com</p>
            </div>

            {/* Phone */}
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-purple-700 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM14 3h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2V5a2 2 0 012-2zM14 14h3a2 2 0 012 2v3a2 2 0 01-2 2h-3a2 2 0 01-2-2v-3a2 2 0 012-2zM3 14h3a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2v-3a2 2 0 012-2z"></path>
              </svg>
              <p className="text-gray-800">+91 9508173611</p>
            </div>

            {/* Helpline */}
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-purple-700 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 8a6 6 0 00-12 0v6a6 6 0 0012 0V8z"></path>
              </svg>
              <p className="text-gray-800">Helpline: +91 98765 43210</p>
            </div>

            {/* Toll-Free */}
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-purple-700 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="text-gray-800">Toll-Free: 1800-123-456</p>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <svg className="w-6 h-6 text-purple-700 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-5M3 3v5h5M21 3l-9 9-7-7L3 14l7 7 11-11z"></path>
              </svg>
              <p className="text-gray-800">
                You know the Place , Prayagraj, Uttar Pradesh, India - 211004
              </p>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
