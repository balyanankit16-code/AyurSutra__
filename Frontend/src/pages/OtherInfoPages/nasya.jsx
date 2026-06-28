
import React from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle, ArrowLeft } from "lucide-react";

const Nasya = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
            Nasya Therapy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Nasal administration of medicated oils for head and neck disorders
          </p>
        </div>

        {/* Image */}
        <div className="rounded-2xl h-64 md:h-96 mb-12 flex items-center justify-center overflow-hidden bg-emerald-100">
          <img 
            src="./src/assets/Nasyam.jpeg" 
            alt="Nasya Therapy - Nasal Treatment"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">About Nasya Therapy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Nasya involves the administration of medicated oils or herbal preparations 
                through the nasal passages. The nose is the gateway to the brain and 
                consciousness, making this therapy highly effective for head and neck regions.
              </p>
              <p>
                This treatment helps to clear the sinus channels, improve mental clarity, 
                and relieve various disorders related to the head, neck, and sensory organs.
              </p>
            </div>

            <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-semibold text-emerald-800">Treatment Duration</span>
              </div>
              <p className="text-gray-700">7 to 14 days</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Benefits</h3>
            <div className="space-y-3">
              {[
                "Clears sinus congestion",
                "Relieves migraine and headaches",
                "Improves vision and eye health",
                "Enhances memory and concentration",
                "Prevents premature hair graying",
                "Strengthens vocal cords",
                "Reduces facial paralysis",
                "Improves sleep quality"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-emerald-800 mt-8 mb-4">Ideal For</h3>
            <div className="flex flex-wrap gap-2">
              {["Sinusitis", "Migraine", "Hair Loss", "Neck Stiffness", 
                "Vision Problems", "Memory Issues", "Facial Paralysis", "Insomnia"].map((condition) => (
                <span key={condition} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Types of Nasya */}
        <div className="mt-12 bg-white rounded-2xl border border-emerald-200 p-8">
          <h3 className="text-2xl font-bold text-emerald-800 mb-6">Types of Nasya</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-xl">
              <h4 className="font-semibold text-emerald-800 mb-3">Shodhana Nasya (Purification)</h4>
              <p className="text-gray-700 text-sm">
                Cleansing type using strong herbal preparations to eliminate toxins from 
                head and neck regions. Used for chronic conditions.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-xl">
              <h4 className="font-semibold text-emerald-800 mb-3">Brimhana Nasya (Nourishing)</h4>
              <p className="text-gray-700 text-sm">
                Nourishing type using medicated oils and ghee to strengthen tissues 
                and improve neurological functions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nasya;