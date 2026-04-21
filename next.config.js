/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // destination: 'https://mock.apifox.cn/m1/2398938-0-default/api/:path*', //生产环境
        destination: 'http://localhost:3005/api/:path*',  //开发环境使用本地API
      },
    ]
  },
}

module.exports = nextConfig
