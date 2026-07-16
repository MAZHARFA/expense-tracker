import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../../Api/Api.Auth";
import Input from "../../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAuthStore();

	const handleSubmit = async (e) => {
		e.preventDefault();
		await forgotPassword(email);
		setIsSubmitted(true);
	};

	return (
		<div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-500 via-black to-gray-500">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden"
			>
				{/* Main Content */}
				<div className="p-8">
					<h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
						Forgot Password
					</h2>

					{!isSubmitted ? (
						<form onSubmit={handleSubmit} className="space-y-6">
							<p className="text-gray-300 mb-6 text-center text-sm sm:text-base">
								Enter your Email address and we’ll send you a link to reset your password.
							</p>

							<Input
								icon={Mail}
								type="email"
								placeholder="Email Address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
								type="submit"
								disabled={isLoading}
							>
								{isLoading ? (
									<Loader className="w-6 h-6 animate-spin mx-auto" />
								) : (
									"Send Reset Link"
								)}
							</motion.button>
						</form>
					) : (
						<div className="text-center space-y-4">
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 500, damping: 30 }}
								className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto"
							>
								<Mail className="h-8 w-8 text-white" />
							</motion.div>
							<p className="text-gray-300 text-sm sm:text-base">
								If an account exists for <span className="font-semibold">{email}</span>, you will receive a password reset link shortly.
							</p>
						</div>
					)}
				</div>

				{/* Footer */}
				<div className="px-8 py-4 bg-black/30 flex justify-center">
					<Link
						to="/login"
						className="text-sm text-green-400 hover:underline flex items-center"
					>
						<ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
					</Link>
				</div>
			</motion.div>
		</div>
	);
};

export default ForgotPassword;
