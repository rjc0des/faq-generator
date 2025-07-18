"use client";

import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function Auth() {
	const [isLogin, setIsLogin] = useState(false);
	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 shadow-xl">
					<div className="text-center mb-8">
						<div className="w-16 h-16 bg-gradient-to-r from-lavender-600 to-lightblue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
							<span className="text-2xl font-bold text-white">
								FAQ
							</span>
						</div>
						<h1 className="text-2xl font-bold text-white mb-2">
							{isLogin ? "Welcome Back" : "Create Account"}
						</h1>
						<p className="text-slate-400">
							{isLogin
								? "Sign in to your account"
								: "Sign up to get started"}
						</p>
					</div>

					{isLogin ? (
						<LoginForm onToggleMode={() => setIsLogin(false)} />
					) : (
						<RegisterForm onToggleMode={() => setIsLogin(true)} />
					)}
				</div>
			</div>
		</div>
	);
}

export default Auth;
