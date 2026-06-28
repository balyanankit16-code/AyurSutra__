import React from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle, ArrowLeft } from "lucide-react";

const Raktamokshana = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
            Raktamokshana
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Blood purification therapy for skin and blood-related disorders
          </p>
        </div>

        {/* Image */}
        <div className="rounded-2xl h-64 md:h-96 mb-12 flex items-center justify-center overflow-hidden bg-emerald-100">
          <img 
            src="./src/assets/raktamokshan.jpeg" 
            alt="Raktamokshana - Blood Purification Therapy"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">About Raktamokshana</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Raktamokshana is a specialized blood purification therapy that eliminates 
                toxins from the bloodstream. It is particularly effective for Pitta-related 
                disorders and conditions where impurities have accumulated in the blood.
              </p>
              <p>
                This therapy can be performed through various methods including leech therapy, 
                venesection, or using specific instruments to draw out impure blood.
              </p>
            </div>

            <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-semibold text-emerald-800">Treatment Duration</span>
              </div>
              <p className="text-gray-700">1 to 3 days, depending on condition</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Benefits</h3>
            <div className="space-y-3">
              {[
                "Purifies blood from toxins",
                "Reduces skin inflammation",
                "Treats chronic skin diseases",
                "Relieves joint inflammation",
                "Improves complexion",
                "Reduces abscess and boils",
                "Helps in gout management",
                "Balances Pitta dosha"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-emerald-800 mt-8 mb-4">Ideal For</h3>
            <div className="flex flex-wrap gap-2">
              {["Psoriasis", "Eczema", "Acne", "Gout", "Abscess", 
                "Boils", "Skin Allergies", "Chronic Inflammation"].map((condition) => (
                <span key={condition} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Methods Section */}
        <div className="mt-12 bg-white rounded-2xl border border-emerald-200 p-8">
          <h3 className="text-2xl font-bold text-emerald-800 mb-6">Treatment Methods</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-emerald-50 p-6 rounded-xl">
              <h4 className="font-semibold text-emerald-800 mb-3">Leech Therapy (Jalaukavacharana)</h4>
              <p className="text-gray-700 text-sm">
                Medicinal leeches are applied to affected areas to draw out impure blood. 
                This method is particularly effective for skin disorders and localized inflammation.
              </p>
            </div>
            <div className="bg-emerald-50 p-6 rounded-xl">
              <h4 className="font-semibold text-emerald-800 mb-3">Venesection (Siravedha)</h4>
              <p className="text-gray-700 text-sm">
                Controlled bloodletting from specific veins to remove toxins. 
                This method requires expert supervision and is used for systemic blood purification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Raktamokshana;