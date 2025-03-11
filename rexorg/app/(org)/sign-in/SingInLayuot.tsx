import React from "react";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="p-6">
          {/* Authentication Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-black-800">
              Welcome to RexOrg
            </h1>
            <p className="text-gray-600">
              Please sign in to access your account
            </p>
          </div>

          {/* Main Content Area */}
          <div className="mb-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
