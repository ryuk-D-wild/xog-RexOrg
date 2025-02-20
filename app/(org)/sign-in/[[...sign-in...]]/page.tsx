import { SignIn } from "@clerk/nextjs";
import AuthLayout from "../SingInLayuot"; // Ensure this path is correct

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
    </AuthLayout>
  );
};

export default SignInPage;
