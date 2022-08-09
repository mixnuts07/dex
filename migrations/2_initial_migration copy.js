// コンパイル済みのContractをimportしている
const ERC20 = artifacts.require("ERC20");
const Dex = artifacts.require("DEX");

// BN .. BigNumber化している　（Stringでも可）
// 10**10*10**18  === totalSupply(10**10) * 小数点を消す？(10) ** 18 (wei表記)
// await deployer.deploy(ERC20, "Dai", "DAI", web3.utils.BN(10**10*10**18));
const toWei = (number) => web3.utils.toWei(web3.utils.toBN(number), "ether");

// functionのexport
module.exports = async function (deployer) {
  await deployer.deploy(ERC20, "Dai", "DAI", toWei(10 ** 10));
  // デプロイしたインスタンスを取得できる
  const dai = await ERC20.deployed();
  await deployer.deploy(ERC20, "Chainlink", "LINK", toWei(10 ** 6));
  // デプロイしたインスタンスを取得できる
  const link = await ERC20.deployed();
  await deployer.deploy(ERC20, "Compound", "COMP", toWei(10 ** 4));
  // デプロイしたインスタンスを取得できる
  const comp = await ERC20.deployed();

  await deployer.deploy(Dex, [dai.address, link.address, comp.address]);
  const dex = await Dex.deployed();

  // dexのコントラクトに全てのトークンを渡す
  // コントラクトのインスタンスを取得できればメソッドを使える（Ex. transfer）
  await dai.transfer(dex.address, toWei(10 ** 10));
  await link.transfer(dex.address, toWei(10 ** 6));
  await comp.transfer(dex.address, toWei(10 ** 4));
};
