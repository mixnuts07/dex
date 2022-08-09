// // SPDX-License-Identifier:MIT
pragma solidity ^0.8.14;
import "./ERC20.sol";
// 外部のコントラクトとやり取りするには
// interface か import でも可能
contract Dex{
    event buy(address account, address _tokenAddr, uint256 _cost, uint256 _amount);
    event sell(address account, address _tokenAddr, uint256 _cost, uint256 _amount);

    // _tokenAddrに対応しているトークンのみ入力させる
    // SolidityのBoolは初期値がFalse.Trueになったものだけ対応している
    mapping (address => bool) public supportedTokenAddr;

    modifier suppoertsToken(address _tokenAddr){
        require(supportedTokenAddr[_tokenAddr] == true, "This Token Is Not Supported");
        _;
    }
    // _tokenAddr はdeploy時に対応するトークンのアドレスを格納した配列が渡される
    // [dai.address, link.address, comp.address]
    constructor (address[] memory _tokenAddr){
        for (uint i=0; i < _tokenAddr.length; i++){
            supportedTokenAddr[_tokenAddr[i]] = true;
        }
    }
    // EthをDexコントラクトに送るから、payableが必要
    // payable関数では読み出すときに引数に{from:, value:, }必要
    function buyToken(address _tokenAddr, uint256 _cost, uint256 _amount) external payable suppoertsToken(_tokenAddr){
        // インスタンスの型の名前はコントラクトの名前と同じになる
        ERC20 token = ERC20(_tokenAddr);
        // costはユーザが払う分。それ以上ユーザはきちんと持っているかどうか。
        require(msg.value == _cost, "Insufficient Fund");
        // DEXコントラクトが充分Tokenを持っているか
        require(token.balanceOf(address(this)) >= _amount, "Token Sold Out");
        token.transfer(msg.sender, _amount);

        emit buy(msg.sender, _tokenAddr, _cost, _amount);
    }

    function SellToken(address _tokenAddr, uint256 _cost, uint256 _amount) external suppoertsToken(_tokenAddr){
        ERC20 token = ERC20(_tokenAddr);

        require(token.balanceOf(msg.sender) >= _cost,"Insufficient Token Balane");
        // このコントラクトにEthがきちんとあるか
        // address(this).balance .. このコントラクト内のEthの残高を取得できる
        require(address(this).balance >= _amount, "Dex Does Not Have Enough Funds");
        // ユーザからDexにトークンをTransfer
        token.transferFrom(msg.sender, address(this), _cost);
        // Ethをユーザに移動
        (bool success, ) = payable(msg.sender).call{value: _amount}("");
        require(success, "EHT Transfer Failed ... ");
        emit sell(msg.sender, _tokenAddr, _cost, _amount);

    }
}