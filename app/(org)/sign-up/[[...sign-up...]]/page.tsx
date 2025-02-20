import { SignUp } from "@clerk/nextjs";
import SignUpLayout from "../SignUpLayout";

const SignUpPage = () => {
  return (
    <SignUpLayout>
      <SignUp path="/sign-up" routing="path" signInUrl="/sign-in" />
    </SignUpLayout>
  );
};

export default SignUpPage;
