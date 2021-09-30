module.exports = {
    configureWebpack: {
      devtool: 'source-map'
    },
    pages: {
      login: {
        entry: "src/pages/login/login.js",
        template: "public/login.jsp",
        filename: "login.jsp",
      },
      store: {
        entry: "src/pages/store/store.js",
        template: "public/store.jsp",
        filename: "store.jsp",
      },
    },
    devServer: {
      port: 9000,
      historyApiFallback: {
        rewrites: [{ from: /\/login/, to: "/login.jsp" },
                   { from: /\/store/, to: "/store.jsp" }
        ],
      },
    },
    chainWebpack: (config) => {
      config.module.rules.delete("eslint");
      const IS_VENDOR = /[\\/]node_modules[\\/]/;
      config.optimization.splitChunks({
        cacheGroups: {
          login: {
            name: `chunk-login-vendors`,
            priority: -11,
            chunks: (chunk) => chunk.name === "form",
            test: IS_VENDOR,
            enforce: true,
          },
          store: {
            name: `chunk-login-vendors`,
            priority: -11,
            chunks: (chunk) => chunk.name === "form",
            test: IS_VENDOR,
            enforce: true,
          },
  
        },
      });
    },
    //local->
    //publicPath: process.env.BASE_URL,
    //production ->
    publicPath: process.env.NODE_ENV === 'production' ? '/stores/' : '/',
  };
  