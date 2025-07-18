import React from "react";

function Banner() {
	return (
		<section className="py-20 px-4 sm:px-6 lg:px-8">
			<div className="max-w-4xl mx-auto text-center">
				<h1 className="text-5xl md:text-6xl font-bold mb-6">
					<span className="bg-gradient-to-r from-lavender-400 via-lightblue-400 to-lavender-300 bg-clip-text text-transparent">
						Simple, Transparent
					</span>
					<br />
					<span className="text-white">Pricing</span>
				</h1>
				<p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
					Choose the perfect plan for your FAQ generation needs. Start
					free and scale as you grow.
				</p>
			</div>
		</section>
	);
}

export default Banner;
