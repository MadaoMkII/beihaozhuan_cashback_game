module.exports = {
  productionSourceMap: false,
  publicPath: '/cashback-activity/',
  devServer: {
    proxy: {
      '/api/': {
        target: 'https://www.mystery-vr.com:3200',
        pathRewrite: { '^/api': '/api2/' },
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
