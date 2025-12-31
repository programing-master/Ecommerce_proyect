"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaTwitter, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser, FaArrowLeft, FaCheck } from "react-icons/fa";
import { MdPerson, MdPhone, MdLocationOn, MdCalendarToday } from "react-icons/md";

export default function Register() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    newsletter: true,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: "",
    };
    
    let isValid = true;
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
      isValid = false;
    }
    
    // Phone validation (optional, but validate if provided)
    if (formData.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, and numbers";
      isValid = false;
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }
    
    // Terms acceptance validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Registering with:", formData);
      setIsLoading(false);
      // Redirect to home or verification page after successful registration
      router.push("/");
    }, 1500);
  };

  const handleSocialRegister = (provider: string) => {
    console.log(`Registering with ${provider}`);
    // Implement social registration logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <FaArrowLeft />
          Back to home
        </Link>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left side - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl mb-4">
                <FaUser className="text-white text-2xl" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                Create Account
              </h1>
              <p className="text-gray-600">
                Join our community and start shopping today
              </p>
            </div>

            {/* Social registration buttons */}
            <div className="mb-8">
              <p className="text-center text-gray-600 mb-4">Or sign up with</p>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleSocialRegister("google")}
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <FaGoogle className="text-red-500" />
                  <span className="hidden sm:inline">Google</span>
                </button>
                <button
                  onClick={() => handleSocialRegister("facebook")}
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <FaFacebook className="text-blue-600" />
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                <button
                  onClick={() => handleSocialRegister("twitter")}
                  className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <FaTwitter className="text-sky-500" />
                  <span className="hidden sm:inline">Twitter</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or register with email
                </span>
              </div>
            </div>

            {/* Registration form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name fields in grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* First name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`pl-10 w-full p-4 border ${
                        errors.firstName ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                      placeholder="John"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                {/* Last name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`pl-10 w-full p-4 border ${
                        errors.lastName ? "border-red-500" : "border-gray-300"
                      } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                      placeholder="Doe"
                    />
                  </div>
                  {errors.lastName && (
                    <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 w-full p-4 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone (optional) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`pl-10 w-full p-4 border ${
                      errors.phone ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 pr-12 w-full p-4 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                )}
                <div className="mt-2 text-sm text-gray-500">
                  • At least 8 characters<br/>
                  • Uppercase and lowercase letters<br/>
                  • At least one number
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className="text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`pl-10 pr-12 w-full p-4 border ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showConfirmPassword ? (
                      <FaEyeSlash className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FaEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 mt-1"
                    id="acceptTerms"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="ml-3 text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-sm text-red-600 ml-8">{errors.acceptTerms}</p>
                )}

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="h-5 w-5 text-emerald-600 rounded focus:ring-emerald-500 mt-1"
                    id="newsletter"
                  />
                  <label
                    htmlFor="newsletter"
                    className="ml-3 text-sm text-gray-700"
                  >
                    Yes, I want to receive exclusive offers and updates via email
                  </label>
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <FaCheck />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Sign in link */}
            <div className="mt-8 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-bold text-emerald-600 hover:text-emerald-700"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Right side - Benefits */}
          <div className="hidden md:block">
            <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">
                  Why Join Us?
                </h2>
                <p className="text-emerald-100">
                  Create an account to unlock amazing benefits and transform your shopping experience.
                </p>
              </div>

              {/* Benefits list */}
              <div className="space-y-6 mb-12">
                {[
                  {
                    icon: "🎁",
                    title: "Welcome Bonus",
                    desc: "Get 20% off your first order when you sign up",
                  },
                  {
                    icon: "⭐",
                    title: "Loyalty Rewards",
                    desc: "Earn points on every purchase and redeem for discounts",
                  },
                  {
                    icon: "🚀",
                    title: "Express Checkout",
                    desc: "Save your details for faster purchases",
                  },
                  {
                    icon: "📱",
                    title: "Order Tracking",
                    desc: "Real-time updates on your orders and deliveries",
                  },
                  {
                    icon: "🛡️",
                    title: "Purchase Protection",
                    desc: "30-day return policy on all items",
                  },
                  {
                    icon: "👑",
                    title: "VIP Access",
                    desc: "Early access to sales and exclusive collections",
                  },
                ].map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-2xl">{benefit.icon}</div>
                    <div>
                      <h3 className="font-bold text-lg">{benefit.title}</h3>
                      <p className="text-emerald-100 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Security badge */}
              <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-3">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <FaCheck className="text-white text-2xl" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">100% Secure</h3>
                    <p className="text-emerald-100 text-sm">
                      Your data is protected with bank-level security
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="text-xs bg-white/20 px-3 py-1 rounded-full">SSL Encrypted</div>
                  <div className="text-xs bg-white/20 px-3 py-1 rounded-full">GDPR Compliant</div>
                  <div className="text-xs bg-white/20 px-3 py-1 rounded-full">Privacy First</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}