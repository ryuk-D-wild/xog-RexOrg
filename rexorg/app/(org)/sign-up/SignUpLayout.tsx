import React from "react";

const SignUpLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
        <div className="p-6">
          {/* Sign-Up Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-black-800">
              Join RexOrg
            </h1>
            <p className="text-gray-600">
              Create an account to get started
            </p>
          </div>

          {/* Main Content Area */}
          <div className="mb-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default SignUpLayout;
