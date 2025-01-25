import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/socket.io/:path*', // Proxy all socket.io requests
				destination: 'http://localhost:5000/socket.io/:path*', // Backend on port 5000
			},
		];
	},
};

export default nextConfig;
