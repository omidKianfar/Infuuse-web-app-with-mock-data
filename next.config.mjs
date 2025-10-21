/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
