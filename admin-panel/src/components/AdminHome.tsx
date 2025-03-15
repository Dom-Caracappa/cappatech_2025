import React, { useState } from "react";

const AdminHome: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Replace with real authentication logic
        setIsLoggedIn(true);
    };

    return (
        <div className="text-white">
            {isLoggedIn ? (
                <h1>Welcome to the Admin Panel</h1>
            ) : (
                <button onClick={handleLogin} className="bg-blue-500 px-4 py-2 text-white">
                    Login
                </button>
            )}
        </div>
    );
};

export default AdminHome;
