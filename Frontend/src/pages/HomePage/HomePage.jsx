import React from "react";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  ShieldCheck,
  Sun,
  Droplet,
  Sparkles,
  ArrowRight,
  ArrowDown,
  Leaf,
  PhoneCall,
  MapPin,
  Mail,
  Clock,
  Users,
} from "lucide-react";

const HomePage = () => {
  const scrollToTherapies = () => {
    document.getElementById("therapies-section").scrollIntoView({
      behavior: "smooth",
    });
  };

  const features = [
    {
      icon: <HeartPulse className="w-8 h-8 text-green-600" />,
      title: "Vamana (Therapeutic Emesis)",
      description:
        "A detoxifying process to remove Kapha toxins through controlled emesis, improving respiratory health.",
      link: "/vamana",
    },
    {
      icon: <Sun className="w-8 h-8 text-green-600" />,
      title: "Virechana (Purgation Therapy)",
      description:
        "A herbal-based cleansing process to expel excess Pitta, purifying the liver and digestive system.",
      link: "/virechana",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
      title: "Basti (Medicated Enema)",
      description:
        "A therapeutic enema that balances Vata dosha, improves digestion, and strengthens the immune system.",
      link: "/basti",
    },
    {
      icon: <Sparkles className="w-8 h-8 text-green-600" />,
      title: "Nasya (Nasal Therapy)",
      description:
        "Cleanses nasal passages using herbal oils, enhancing concentration and relieving headaches.",
      link: "/nasya",
    },
    {
      icon: <Droplet className="w-8 h-8 text-green-600" />,
      title: "Raktamokshana (Blood Purification)",
      description:
        "Bloodletting therapy that purifies blood, treats skin disorders, and reduces inflammation.",
      link: "/raktamokshana",
    },
  ];

  const stats = [
    { label: "Years of Healing", value: "20+" },
    { label: "Happy Patients", value: "15K+" },
    { label: "Certified Practitioners", value: "50+" },
    { label: "Wellness Centers", value: "12" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-r from-emerald-50 to-lime-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center px-6 py-24 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 leading-tight">
            Restore Balance Through{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-lime-600">
              Ancient Ayurveda
            </span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            At AyurSutra, we combine ancient wisdom with modern wellness to
            bring holistic healing through Panchkarma and personalized therapies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/book"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200"
            >
              Begin Healing <ArrowRight className="w-5 h-5" />
            </Link>
            <button
              onClick={scrollToTherapies}
              className="border border-emerald-600 text-emerald-700 hover:bg-emerald-50 px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2"
            >
              Explore Therapies <ArrowDown className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Panchkarma Therapies Section */}
      <section id="therapies-section" className="py-20 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 mb-4">
              Five Panchkarma Therapies
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the timeless detoxification rituals that purify the body
              and rejuvenate the mind. Click on any therapy to learn more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="block p-6 bg-emerald-50 border border-emerald-100 rounded-xl shadow-sm hover:shadow-lg hover:bg-emerald-100/60 transition-all duration-300"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center">
                  {feature.description}
                </p>
                <div className="mt-4 flex justify-center">
                  <div className="bg-emerald-600 text-white px-3 py-1 rounded text-sm font-semibold">
                    Learn More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-emerald-700 to-lime-600 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8 px-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-90 font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-emerald-800 mb-4">
              Why Choose Panchkarma?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience profound healing and transformation through our authentic Ayurvedic treatments
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Complete Detoxification", description: "Remove deep-rooted toxins from tissues and cells for complete body purification" },
              { title: "Dosha Balance", description: "Restore harmony to Vata, Pitta, and Kapha for optimal health and vitality" },
              { title: "Natural Healing", description: "100% natural treatments using herbs, oils, and traditional methods" },
              { title: "Holistic Approach", description: "Treat mind, body, and spirit together for comprehensive wellness" },
              { title: "Long-lasting Results", description: "Address root causes rather than symptoms for sustainable health" },
              { title: "Expert Guidance", description: "Learn from experienced Ayurvedic practitioners with decades of knowledge" }
            ].map((benefit, index) => (
              <div key={index} className="bg-emerald-50 p-6 rounded-xl border border-emerald-200">
                <h3 className="text-lg font-semibold text-emerald-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-700 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Footer Section */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Leaf className="w-8 h-8 text-lime-400" />
                <div>
                  <span className="text-2xl font-bold text-white block">AyurSutra</span>
                  <span className="text-sm text-lime-300 block">Panchakarma Center</span>
                </div>
              </div>
              <p className="text-emerald-100 leading-relaxed">
                Healing the world with Ayurveda — one soul at a time.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg text-white mb-4">Quick Links</h4>
              <ul className="space-y-3 text-emerald-100">
                <li><Link to="/about" className="hover:text-lime-400 transition-colors duration-200">About Us</Link></li>
                <li><Link to="/therapies" className="hover:text-lime-400 transition-colors duration-200">Our Therapies</Link></li>
                <li><Link to="/blog" className="hover:text-lime-400 transition-colors duration-200">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-lime-400 transition-colors duration-200">Contact Us</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg text-white mb-4">Support</h4>
              <ul className="space-y-3 text-emerald-100">
                <li><a href="#" className="hover:text-lime-400 transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors duration-200">FAQs</a></li>
                <li><a href="#" className="hover:text-lime-400 transition-colors duration-200">Support Center</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg text-white mb-4">Get in Touch</h4>
              <div className="space-y-3 text-emerald-100">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-lime-400" />
                  <span>Pune, India</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-lime-400" />
                  <span>contact@ayursutra.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneCall className="w-4 h-4 text-lime-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-lime-400" />
                  <span>Mon-Sun: 7AM-9PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;