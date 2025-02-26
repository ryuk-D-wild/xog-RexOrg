import { SignUp } from "@clerk/nextjs";
import SignUpLayout from "../SignUpLayout";

export default function Page () {
  return (
    <SignUpLayout>
      <SignUp />
    </SignUpLayout>
  );
};


