import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../SingInLayuot"; // Ensure this path is correct

export default function Page () {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};


