import ResetPasswordForm from "@/components/pages/account/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Reset Your Password</h1>
      <ResetPasswordForm />
    </div>
  );
}