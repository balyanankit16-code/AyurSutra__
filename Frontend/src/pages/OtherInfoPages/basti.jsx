import React from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle, ArrowLeft } from "lucide-react";

const Basti = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link
          to="/"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
            Basti Therapy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Medicated enema therapy for Vata disorders and overall rejuvenation
          </p>
        </div>

\        <div className="rounded-2xl h-64 md:h-96 mb-12 flex items-center justify-center overflow-hidden bg-emerald-100">
          <img
            src="./src/assets/basti.jpg"
            alt="Basti Therapy - Medicated Enema Treatment"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-bold text-emerald-800 mb-4">
              About Basti Therapy
            </h2>
            <div className="space-y-3 text-gray-700">
              <p>
                Basti is considered the most important of all Panchakarma
                treatments, specifically designed to balance Vata dosha. It
                involves the administration of medicated oils and herbal
                decoctions through the rectal route.
              </p>
              <p>
                This therapy nourishes the colon, which is the main seat of
                Vata, and helps in eliminating toxins from the entire body
                through the intestinal tract.
              </p>
            </div>

            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-semibold text-emerald-800">
                  Treatment Duration
                </span>
              </div>
              <p className="text-gray-700">
                8 to 30 days, depending on condition
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-emerald-800 mb-4">
              Benefits
            </h3>
            <div className="space-y-3">
              {[
                "Balances Vata dosha effectively",
                "Improves digestive strength",
                "Relieves chronic constipation",
                "Reduces joint pain and arthritis",
                "Strengthens nervous system",
                "Enhances overall vitality",
                "Improves skin health",
                "Reduces stress and anxiety",
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-emerald-800 mt-8 mb-4">
              Ideal For
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Arthritis",
                "Constipation",
                "Back Pain",
                "Neurological Disorders",
                "Digestive Issues",
                "Chronic Fatigue",
                "Anxiety",
                "Insomnia",
              ].map((condition) => (
                <span
                  key={condition}
                  className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm"
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Basti;
