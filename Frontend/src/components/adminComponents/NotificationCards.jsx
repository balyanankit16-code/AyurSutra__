// import { useEffect, useState } from "react";
// import api from "../../utils/axios"; // axios instance (with credentials)
// import { Check, Bell, Trash2 } from "lucide-react";

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);

  
//   const fetchNotifications = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/notifications");
//       setNotifications(res.data.data.notifications);
//       fetchUnreadCount();
//     } catch (err) {
//       console.error("Error fetching notifications:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch unread count
//   const fetchUnreadCount = async () => {
//     try {
//       const res = await api.get("/notifications/unread-count");
//       setUnreadCount(res.data.data.unreadCount);
//     } catch (err) {
//       console.error("Error fetching unread count:", err);
//     }
//   };

//   // Mark notification as read
//   const markAsRead = async (id) => {
//     try {
//       await api.patch(`/notifications/${id}/read`);
//       fetchNotifications();
//     } catch (err) {
//       console.error("Error marking as read:", err);
//     }
//   };

//   // Mark all as read
//   const markAllAsRead = async () => {
//     try {
//       await api.patch("/notifications/read-all");
//       fetchNotifications();
//     } catch (err) {
//       console.error("Error marking all as read:", err);
//     }
//   };

//   // Delete notification
//   const deleteNotification = async (id) => {
//     try {
//       await api.delete(`/notifications/${id}`);
//       fetchNotifications();
//     } catch (err) {
//       console.error("Error deleting notification:", err);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   // Filter notifications
//   const filteredNotifications =
//     filter === "unread"
//       ? notifications.filter(
//           (n) => n.status === "sent" || n.status === "delivered"
//         )
//       : notifications;

//   return (
//     <div className="min-h-screen bg-green-50 flex flex-col items-center py-8">
//       <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 border border-green-100">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center gap-3">
//             <Bell className="text-green-600 w-7 h-7" />
//             <h2 className="text-2xl font-semibold text-green-800">
//               Notifications
//             </h2>
//           </div>

//           <button
//             onClick={markAllAsRead}
//             className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg shadow"
//           >
//             Mark all as read
//           </button>
//         </div>

//         {/* Filter Tabs */}
//         <div className="flex mb-6 border-b border-green-200">
//           <button
//             className={`px-6 py-2 text-sm font-medium ${
//               filter === "all"
//                 ? "text-green-700 border-b-2 border-green-600"
//                 : "text-green-500"
//             }`}
//             onClick={() => setFilter("all")}
//           >
//             All Notifications
//           </button>
//           <button
//             className={`px-6 py-2 text-sm font-medium ${
//               filter === "unread"
//                 ? "text-green-700 border-b-2 border-green-600"
//                 : "text-green-500"
//             }`}
//             onClick={() => setFilter("unread")}
//           >
//             Unread ({unreadCount})
//           </button>
//         </div>

//         {/* Notifications List */}
//         {loading ? (
//           <div className="text-center text-green-600 py-8">Loading...</div>
//         ) : filteredNotifications.length === 0 ? (
//           <div className="text-center text-green-500 py-8">
//             No notifications found.
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {filteredNotifications.map((notif) => (
//               <div
//                 key={notif._id}
//                 className={`p-4 rounded-xl shadow-sm border flex justify-between items-start ${
//                   notif.status === "read"
//                     ? "bg-green-100"
//                     : "bg-green-50 border-green-200"
//                 }`}
//               >
//                 <div>
//                   <h3 className="font-semibold text-green-800">
//                     {notif.title}
//                   </h3>
//                   <p className="text-green-700 text-sm mt-1">
//                     {notif.message}
//                   </p>
//                   <p className="text-xs text-green-500 mt-2">
//                     {new Date(notif.createdAt).toLocaleString()}
//                   </p>
//                 </div>

//                 <div className="flex flex-col items-end gap-2">
//                   {notif.status !== "read" && (
//                     <button
//                       onClick={() => markAsRead(notif._id)}
//                       className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
//                     >
//                       <Check className="w-4 h-4" /> Mark as read
//                     </button>
//                   )}
//                   <button
//                     onClick={() => deleteNotification(notif._id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationPage;

import { useEffect, useState } from "react";
import api from "../../utils/axios";
import { Check, Bell, Trash2 } from "lucide-react";

const NotificationCard = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await api.get("/notifications");
      setNotifications(res.data.data.notifications);
      fetchUnreadCount();
    } catch (err) {
      console.error("Error fetching notifications:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch unread count
  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/notifications/unread-count");
      setUnreadCount(res.data.data.unreadCount);
    } catch (err) {
      console.error("Error fetching unread count:", err);
    }
  };

  // Mark notification as read
  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      fetchNotifications();
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      fetchNotifications();
    } catch (err) {
      console.error("Error marking all as read:", err);
    }
  };

  // Delete notification
  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Filter notifications
  const filteredNotifications =
    filter === "unread"
      ? notifications.filter(
          (n) => n.status === "sent" || n.status === "delivered"
        )
      : notifications;

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-8">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-6 border border-green-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Bell className="text-green-600 w-7 h-7" />
            <h2 className="text-2xl font-semibold text-green-800">
              Notifications
            </h2>
          </div>

          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg shadow"
          >
            Mark all as read
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex mb-6 border-b border-green-200">
          <button
            className={`px-6 py-2 text-sm font-medium ${
              filter === "all"
                ? "text-green-700 border-b-2 border-green-600"
                : "text-green-500"
            }`}
            onClick={() => setFilter("all")}
          >
            All Notifications
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium ${
              filter === "unread"
                ? "text-green-700 border-b-2 border-green-600"
                : "text-green-500"
            }`}
            onClick={() => setFilter("unread")}
          >
            Unread ({unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        {loading ? (
          <div className="text-center text-green-600 py-8">Loading...</div>
        ) : filteredNotifications.length === 0 ? (
          <div className="text-center text-green-500 py-8">
            No notifications found.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notif) => (
              <div
                key={notif._id}
                className={`p-4 rounded-xl shadow-sm border flex justify-between items-start ${
                  notif.status === "read"
                    ? "bg-green-100"
                    : "bg-green-50 border-green-200"
                }`}
              >
                <div>
                  <h3 className="font-semibold text-green-800">
                    {notif.title}
                  </h3>
                  <p className="text-green-700 text-sm mt-1">
                    {notif.message}
                  </p>
                  <p className="text-xs text-green-500 mt-2">
                    {new Date(notif.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {notif.status !== "read" && (
                    <button
                      onClick={() => markAsRead(notif._id)}
                      className="text-green-600 hover:text-green-800 text-sm flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Mark as read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationCard;

