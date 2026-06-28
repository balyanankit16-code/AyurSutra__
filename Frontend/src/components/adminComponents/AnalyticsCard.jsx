// // AnalyticsCard.jsx - Simple Static Design
// const AnalyticsCard = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//         {/* Sidebar */}
       

//         {/* Main Content */}
//         <div className="lg:col-span-3">
//           <div className="bg-white rounded-lg shadow-sm p-6">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6">Analytics Overview</h2>
            
//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//               <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
//                 <h3 className="text-2xl font-bold text-gray-900">1,234</h3>
//                 <p className="text-gray-600">Total Sessions</p>
//               </div>
//               <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
//                 <h3 className="text-2xl font-bold text-gray-900">89%</h3>
//                 <p className="text-gray-600">Completion Rate</p>
//               </div>
//               <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
//                 <h3 className="text-2xl font-bold text-gray-900">4.5</h3>
//                 <p className="text-gray-600">Avg Rating</p>
//               </div>
//             </div>

//             <div className="text-center py-12 text-gray-500">
//               Analytics charts and detailed reports coming soon...
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsCard;

// AnalyticsCard.jsx - Simple Static Design
const AnalyticsCard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Analytics Overview</h2>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 p-6 rounded-2xl border-l-4 border-green-500">
                <h3 className="text-2xl font-bold text-gray-800">1,234</h3>
                <p className="text-gray-600">Total Sessions</p>
              </div>
              <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
                <h3 className="text-2xl font-bold text-gray-800">89%</h3>
                <p className="text-gray-600">Completion Rate</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-2xl border-l-4 border-purple-500">
                <h3 className="text-2xl font-bold text-gray-800">4.5</h3>
                <p className="text-gray-600">Avg Rating</p>
              </div>
            </div>

            <div className="text-center py-12 text-gray-500">
              Analytics charts and detailed reports coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCard;