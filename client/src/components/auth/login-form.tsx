"use client";

import Link from "next/link";
import { useState } from "react";
import AuthInput from "./auth-input";
import AuthCheckbox from "./auth-checkbox";
import AuthFooter from "./auth-footer";
import AuthButton from "./auth-button";
import Divider from "./divider";
import PasswordInput from "./password-input";
import SocialLogin from "./social-login";
import DemoLoginButton from "./demo-login-button";
export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const DEMO_USER = {
  email: "demo@fittrack.ai",
  password: "Demo12345",
};

const handleDemoLogin = () => {
  setEmail(DEMO_USER.email);
  setPassword(DEMO_USER.password);

  // যখন backend connect করবে
  // login(DEMO_USER);
};
  return (
    <form className="space-y-6">

      <div className="space-y-2">
        

<AuthInput
  label="Email"
  type="email"
  placeholder="you@example.com"
  value={email}
  onChange={setEmail}
/>
      </div>

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Enter password"
        value={password}
        onChange={setPassword}
      />

      <div className="flex items-center justify-between">

        
        <AuthCheckbox label="Remember me" />

        <Link
          href="/forgot-password"
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          Forgot Password?
        </Link>

      </div>

      <AuthButton>
  Sign In
</AuthButton>
<DemoLoginButton
  onClick={handleDemoLogin}
/>
      <Divider />

      <SocialLogin />

      <AuthFooter
  text="Don't have an account?"
  link="Register"
  href="/register"
/>

    </form>
  );
}