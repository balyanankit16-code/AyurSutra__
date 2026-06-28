import React from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle, ArrowLeft } from "lucide-react";

const Virechana = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
            Virechana Therapy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Therapeutic purgation for Pitta-related disorders and liver detoxification
          </p>
        </div>

        {/* Image */}
        <div className="rounded-2xl h-64 md:h-96 mb-12 flex items-center justify-center overflow-hidden bg-emerald-100">
          <img 
            src="./src/assets/Virechana.jpeg" 
            alt="Virechana Therapy - Therapeutic Purgation"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">About Virechana Therapy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Virechana is a controlled purgation therapy that eliminates excess Pitta dosha 
                from the body. It specifically targets the liver, gallbladder, and small intestine 
                where Pitta predominantly resides.
              </p>
              <p>
                This therapy uses specific herbal laxatives to cleanse the gastrointestinal tract 
                and remove toxins that cause various Pitta-related disorders.
              </p>
            </div>

            <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-semibold text-emerald-800">Treatment Duration</span>
              </div>
              <p className="text-gray-700">3 to 5 days</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Benefits</h3>
            <div className="space-y-3">
              {[
                "Detoxifies liver and gallbladder",
                "Purifies blood",
                "Improves skin complexion",
                "Reduces acidity and heartburn",
                "Treats chronic fever",
                "Helps in jaundice recovery",
                "Reduces skin inflammation",
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
              {["Liver Disorders", "Skin Diseases", "Chronic Fever", "Jaundice", 
                "Acidity", "Inflammatory Conditions", "Herpes", "Migraine"].map((condition) => (
                <span key={condition} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-2xl border border-emerald-200 p-8">
          <h3 className="text-2xl font-bold text-emerald-800 mb-6">Treatment Process</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <span className="font-bold">1</span>
              </div>
              <h4 className="font-semibold text-emerald-800 mb-2">Preparation</h4>
              <p className="text-gray-600 text-sm">Internal oleation with medicated ghee</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <span className="font-bold">2</span>
              </div>
              <h4 className="font-semibold text-emerald-800 mb-2">Purgation</h4>
              <p className="text-gray-600 text-sm">Administering herbal purgatives</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4">
                <span className="font-bold">3</span>
              </div>
              <h4 className="font-semibold text-emerald-800 mb-2">Recovery</h4>
              <p className="text-gray-600 text-sm">Light diet and rest period</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Virechana;