import React from "react";
import { Link } from "react-router-dom";
import { Clock, CheckCircle, ArrowLeft } from "lucide-react";

const Vamana = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
            Vamana Therapy
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Therapeutic emesis for Kapha-related respiratory and metabolic disorders
          </p>
        </div>

        {/* Image */}
        <div className="rounded-2xl h-64 md:h-96 mb-12 flex items-center justify-center overflow-hidden bg-emerald-100">
          <img 
            src="./src/assets/vamana.jpg" 
            alt="Vamana Therapy - Therapeutic Emesis"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">About Vamana Therapy</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Vamana is a controlled therapeutic emesis procedure designed to eliminate 
                excess Kapha dosha from the body. It is particularly effective for respiratory 
                disorders and conditions where Kapha accumulation causes blockages.
              </p>
              <p>
                This therapy involves the administration of specific herbs and substances 
                that induce vomiting, thereby expelling toxins from the stomach and respiratory tract.
              </p>
            </div>

            <div className="mt-8 p-6 bg-emerald-50 rounded-xl border border-emerald-200">
              <div className="flex items-center mb-4">
                <Clock className="w-5 h-5 text-emerald-600 mr-2" />
                <span className="font-semibold text-emerald-800">Treatment Duration</span>
              </div>
              <p className="text-gray-700">5 to 7 days</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Benefits</h3>
            <div className="space-y-3">
              {[
                "Clears respiratory passages",
                "Reduces asthma symptoms",
                "Improves digestion",
                "Treats skin diseases",
                "Reduces cholesterol",
                "Helps in diabetes management",
                "Eliminates sinus congestion",
                "Boosts immunity"
              ].map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>

            <h3 className="text-xl font-bold text-emerald-800 mt-8 mb-4">Ideal For</h3>
            <div className="flex flex-wrap gap-2">
              {["Asthma", "Bronchitis", "Diabetes", "Obesity", "Sinusitis", 
                "Skin Diseases", "High Cholesterol", "Chronic Cold"].map((condition) => (
                <span key={condition} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                  {condition}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Treatment Precautions */}
        <div className="mt-12 bg-amber-50 rounded-2xl border border-amber-200 p-8">
          <h3 className="text-2xl font-bold text-amber-800 mb-4">Important Notes</h3>
          <div className="space-y-3 text-amber-700">
            <p>• Vamana therapy should only be performed under expert supervision</p>
            <p>• Not recommended for children, elderly, or weak patients</p>
            <p>• Proper pre-therapy preparation is essential for best results</p>
            <p>• Follow-up care includes specific diet and lifestyle recommendations</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vamana;