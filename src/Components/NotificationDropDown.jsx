import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const NotificationDropdown = () => {
  const { user } = useContext(UserContext);

  if (!user) return null;

  // Filter out read notifications to get the badge count
  const unreadCount = user.notifications?.filter(n => !n.isRead).length || 0;

  return (
    <Link 
      to="/notifications"
      className="relative w-[40px] h-[40px] rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 cursor-pointer hover:bg-blue-200 transition-colors focus:outline-none no-underline"
    >
      <span className="text-[20px]">🔔</span>
      
      {/* Red Badge for Unread Notifications */}
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-red-500 rounded-full border-2 border-white">
          {unreadCount}
        </span>
      )}
    </Link>
  );
};

export default NotificationDropdown;