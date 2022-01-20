const courseMarketplace = artifacts.require("Marketplace");

module.exports = function (deployer) {
  deployer.deploy(courseMarketplace);
};
