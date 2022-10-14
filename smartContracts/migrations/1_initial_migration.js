const RevereToken = artifacts.require('./RevereToken.sol');
module.exports = function(deployer) {
    deployer.deploy(RevereToken);
}
