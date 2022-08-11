// コンパイル済みのContractをimportしている
const Dai = artifacts.require("Dai");
const Link = artifacts.require("Link");
const Comp = artifacts.require("Comp");
const Dex = artifacts.require("DEX");

// BN .. BigNumber化している　（Stringでも可）
// 10**10*10**18  === totalSupply(10**10) * 小数点を消す？(10) ** 18 (wei表記)
// await deployer.deploy(ERC20, "Dai", "DAI", web3.utils.BN(10**10*10**18));
const toWei = (number) => web3.utils.toWei(web3.utils.toBN(number), "ether");

// functionのexport
module.exports = async function (deployer) {
  await deployer.deploy(Dai, "Dai", "DAI", toWei(10 ** 10));
  // デプロイしたインスタンスを取得できる
  const dai = await Dai.deployed();
  await deployer.deploy(Link, "Chainlink", "LINK", toWei(10 ** 6));
  // デプロイしたインスタンスを取得できる
  const link = await Link.deployed();
  await deployer.deploy(Comp, "Compound", "COMP", toWei(10 ** 4));
  // デプロイしたインスタンスを取得できる
  const comp = await Comp.deployed();

  await deployer.deploy(Dex, [dai.address, link.address, comp.address]);
  const dex = await Dex.deployed();

  // dexのコントラクトに全てのトークンを渡す
  // コントラクトのインスタンスを取得できればメソッドを使える（Ex. transfer）
  await dai.transfer(dex.address, toWei(10 ** 10));
  await link.transfer(dex.address, toWei(10 ** 6));
  await comp.transfer(dex.address, toWei(10 ** 4));
};
