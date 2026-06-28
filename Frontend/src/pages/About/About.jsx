import React from "react";
import hero from "../../assets/ayurveda-hero.jpg"; 

const About = () => {
  return (
    <main className="bg-gray-50 text-gray-800 font-sans">

      {/* --- Hero Section --- */}
      <section className="py-24 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left Column: Text */}
            <div>
              <h2 className="text-3xl font-bold text-emerald-700 sm:text-4xl mb-4">
                About AyurSutra
              </h2>
              <p className="text-gray-600 text-lg leading-8">
                AyurSutra is dedicated to restoring balance and wellness through the ancient science of Ayurveda. We combine traditional Panchkarma therapies with modern holistic care to support your mind, body, and spirit.
              </p>
              <p className="mt-4 text-gray-600 text-lg leading-8">
                Our mission is to empower individuals to achieve optimal health, detoxify naturally, and maintain long-term well-being through personalized Ayurvedic treatments.
              </p>
            </div>

            {/* Right Column: Image */}
            <div className="mt-10 lg:mt-0">
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={hero}
                  alt="Ayurvedic therapy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- Mission Section --- */}
      <section className="py-24 bg-emerald-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            {/* Left Column: Image */}
            <div className="mt-10 lg:mt-0">
              <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-2xl shadow-xl">
                <img
                  src={hero}
                  alt="Healing with Ayurveda"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Right Column: Text */}
            <div>
              <h2 className="text-3xl font-bold text-emerald-700 sm:text-4xl mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 text-lg leading-8">
                To provide holistic healing through Panchkarma and Ayurvedic therapies, helping individuals detoxify naturally, reduce stress, and restore balance in their daily lives.
              </p>
              <p className="mt-4 text-gray-600 text-lg leading-8">
                We aim to make Ayurveda accessible, personalized, and effective for everyone seeking better health and long-term wellness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Core Values Section --- */}
      <section className="py-24 bg-green-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              AyurSutra is guided by principles of authenticity, care, and holistic wellness. These values drive everything we do:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Value 1 */}
            <div className="bg-gradient-to-br from-emerald-500 to-lime-500 p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Holistic Healing</h3>
              <p className="text-white/90">
                We treat the body, mind, and spirit together, restoring natural balance through Ayurvedic therapies.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-gradient-to-br from-emerald-500 to-lime-500 p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Authenticity</h3>
              <p className="text-white/90">
                All therapies are rooted in traditional Ayurvedic practices, using natural herbs, oils, and techniques.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-gradient-to-br from-emerald-500 to-lime-500 p-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-2">Personalized Care</h3>
              <p className="text-white/90">
                Each treatment plan is tailored to your individual dosha and health needs for maximum effectiveness.
              </p>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
