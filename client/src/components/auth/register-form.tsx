"use client";

import { useState } from "react";
import Link from "next/link";

import AuthInput from "./auth-input";
import PasswordInput from "./password-input";
import AuthCheckbox from "./auth-checkbox";
import AuthButton from "./auth-button";
import AuthFooter from "./auth-footer";
import Divider from "./divider";
import SocialLogin from "./social-login";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
const [image, setImage] = useState("");
  return (
    <form className="space-y-6">
      <AuthInput
        label="Full Name"
        type="text"
        placeholder="John Doe"
        value={name}
        onChange={setName}
      />

      <AuthInput
        label="Email"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={setEmail}
      />
      <AuthInput
  label="Profile Image URL"
  type="url"
  placeholder="https://example.com/avatar.jpg"
  value={image}
  onChange={setImage}
/>

<p className="mt-2 text-xs text-slate-400">
  Paste a public image URL. You can update it later from your profile.
</p>

      <PasswordInput
        id="password"
        label="Password"
        placeholder="Create a password"
        value={password}
        onChange={setPassword}
      />

      

      <div className="space-y-4">
        <AuthCheckbox label="I agree to the Terms & Conditions" />

        <p className="text-xs text-slate-400">
          By creating an account you agree to our{" "}
          <Link
            href="/terms"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-emerald-400 hover:text-emerald-300"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>

      <AuthButton>
        Create Account
      </AuthButton>

      <Divider />

      <SocialLogin />

      <AuthFooter
        text="Already have an account?"
        link="Login"
        href="/login"
      />
    </form>
  );
}