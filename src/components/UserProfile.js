import React from "react";
import { useAuth } from "../context/auth-context";

const UserProfile = () => {
  const { user } = useAuth();
  const avatarUrl = user.images[0].url;

  return (
    <button className="flex items-center py-1 pr-1 rounded-full hover:bg-spotify-gray-600">
      <img src={avatarUrl} alt="avatar" className="w-6 h-6 rounded-full" />

      <span className="ml-2 font-bold text-white hover:underlin">
        {user.display_name}
      </span>
      <span className="ml-1">
        <svg
          className="w-6 h-6 text-white fill-current"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path
            className="heroicon-ui"
            d="M15.3 9.3a1 1 0 011.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 011.4-1.4l3.3 3.29 3.3-3.3z"
          />
        </svg>
      </span>
    </button>
  );
};

export default UserProfile;
