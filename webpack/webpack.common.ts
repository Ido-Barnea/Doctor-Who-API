import path from 'path';

const config = {
  entry: path.resolve(__dirname, '..', 'src/server.ts'),
  target: 'node',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'bundle.js',
  },
  stats: 'errors-only',
}

export default config;
