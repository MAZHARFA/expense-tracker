import { motion } from "framer-motion";
import Input from "../../components/Input.jsx";
import { Loader, Lock, Mail, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/PasswordStrength.jsx";
import { useAuthStore } from "../../Api/Api.Auth.js";
import Profile from "../../components/Profile.jsx";
import toast from "react-hot-toast";

const SignUp = () => {
  const [Name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ProfilePicPreview, setProfilePicPreview] = useState(null);
  const [ProfilePicFile, setProfilePicFile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { signup, error, isLoading, uploadImage } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation
    if (!Name.trim() || !email.trim() || !password.trim()) {
      toast.error("First  fill in all required fields.");
      return;
    }
    if (Name.trim().length < 3) {
      toast.error("Name is too short.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])/;
    if (password.length < 8 || !passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include uppercase, lowercase & special characters."
      );
      return;
    }

    let imageUrl = "";
    if (ProfilePicFile) {
      try {
        const res = await uploadImage(ProfilePicFile);
        imageUrl = res.imageUrl || "";
      } catch (err) {
        toast.error("Image upload failed.");
        return;
      }
    }

    try {
      await signup(email, password, Name, imageUrl);
      toast.success("Account created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setProfilePicPreview(null);
      setProfilePicFile(null);
      navigate("/verify-email");
    } catch (err) {
      toast.error(err.message || "Sign up failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 via-gray-600 to-black px-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-2 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            Create Account
          </h2>
          <p className="mt-2 text-gray-300 text-sm">
            Sign up to get started
          </p>
        </div>

        {/* Profile Upload */}
        <div className="flex justify-center mt-3">
          <Profile
            imagePreview={ProfilePicPreview}
            setImagePreview={setProfilePicPreview}
            setImageFile={setProfilePicFile}
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="px-6 py-8 flex flex-col gap-5">
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="relative">
            <Input
              icon={Lock}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-1/3 -translate-y-1/2 text-gray-400 hover:text-gray-200 cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <PasswordStrengthMeter password={password} />

          {error && (
            <p className="text-red-500 text-sm font-medium text-center">
              {error}
            </p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200 cursor-pointer"
          >
            {isLoading ? (
              <Loader className="w-6 h-6 animate-spin mx-auto" />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 text-center border-t border-white/10">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-green-400 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
