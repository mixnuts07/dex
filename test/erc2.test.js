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

const toWei = (number) => web3.utils.toWei(web3.utils.toBN(number), "ether");

// テスト書いていく！
contract("ERC20 Token Test", (accounts) => {
  let dai, link, comp;

  const owner = accounts[0];
  const Kazu = accounts[1];
  const Take = accounts[2];

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
    // equal .. 同じ
    // gte .. grate equal
    // lte .. less than equal
    // gt, lt など！
    expect(await dai.name()).to.equal("Dai");
    expect(await link.symbol()).to.equal("LINK");
  });

  it("Should have Correct Total Supply", async () => {
    expect(await comp.totalSupply()).to.bignumber.equal(toWei(10 ** 4));
  });
  // このテストは失敗を期待する
  // Balanceより１多いから
  // chaiは失敗を期待するメソッドがない
  it("Should revert When Transfer Amount > Balance", async () => {
    const ownerBalance = await comp.balanceOf(owner);
    // BigNumberの足し算はこれ
    const transferAmount = ownerBalance.add(new BN(1));
    // reverts .. 失敗を期待
    // passes .. 成功を期待
    await truffleAssert.reverts(comp.transfer(Kazu, transferAmount));
  });

  // itのテストがいっぱいあると大変　→ describe
  describe("Supply", () => {
    // before や　after なども記述できる
    // it を記述していく
    // テストの分類が可能！
  });
});
