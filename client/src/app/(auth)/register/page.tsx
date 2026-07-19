import AuthLayout from "@/components/auth/auth-layout";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account 🚀"
      subtitle="Start your fitness journey today."
    >
      <RegisterForm />
    </AuthLayout>
  );
}