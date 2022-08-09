// コントラクトのビルドファイルから取得
const Dai = artifacts.require("Dai");
const Link = artifacts.require("Link");
const Comp = artifacts.require("Comp");

// Big Numberの設定
// bn.jsはtruffleインストール時に自動でインストールされている
const BN = require("bn.js");
const chai = require("chai");
const { expect } = chai;
// chaiでは元々ビッグナンバーが使えない
// ビッグナンバーには色々種類があるが、今回はbn.jsを使うからこう書く
chai.use(require("chai-bn")(BN));

const truffleAssert = require("truffle-assertions");
// テスト書いていく！
contract("ERC20 Token Test", (accounts) => {
  let dai, link, comp;

  const owner = accounts[0];
  const John = accounts[1];
  const Hassle = accounts[2];

  // テスト開始前に始める作業
  // contractではasyncが書けない
  before(async () => {
    dai = await Dai.deployed();
    link = await Link.deployed();
    comp = await Comp.deployed();
  });

  // テスト記載！
  it("should return token name and symbols correctly", async () => {
    // dai.nameを読んだ後Daiであることを期待する
    expect(await dai.name()).to.equal("Dai");
  });
});
