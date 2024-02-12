const { getDefaultConfig } = require("expo/metro-config")
const nodeLibs = require("node-libs-react-native")

module.exports = (() => {
  // eslint-disable-next-line no-undef
  const config = getDefaultConfig(__dirname)

  const { transformer, resolver } = config

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer")
  }
  config.resolver = {
    ...resolver,
    extraNodeModules: {
      ...nodeLibs,
      ...resolver.extraNodeModules
    },
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"]
  }

  return config
})()
