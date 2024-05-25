import { merge } from 'webpack-merge';
import commonConfig from './webpack.common';

module.exports = (envVars: {env: string}) => {
  const { env } = envVars
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const envConfig = require(`./webpack.${env}`)
  const config = merge(commonConfig, envConfig)
  return config
}