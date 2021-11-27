const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = async ({ config }) => {
  config.module.rules.push({
    test: /\.pug$/,
    loader: 'pug-plain-loader',
  })

  config.module.rules.push({
    test: /\.css$/,
    use: [
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: [
            require('tailwindcss'),
            require('autoprefixer'),
          ],
        },
      },
    ],
    include: rootPath
  })

  config.module.rules.push({
    test: /\.styl(us)?$/,
    use: [
      'style-loader', 'vue-style-loader', {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          importLoaders: 2,
          onlyLocals: false
        }
      },
      'postcss-loader',
      {
        loader: 'stylus-loader',
        options: {
          sourceMap: true
        }
      }
    ],
    include: rootPath
  })

  return config
}