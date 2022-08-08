// SPDX-License-Identifier:MIT
pragma solidity ^0.8.14;

contract ERC20{
    string public name;
    string public symbol;
    uint8  public decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) private balances;
    
    mapping(address => mapping(address => uint256)) private allowances; 
    
    // transfer関数にはeventが必要
    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    event Approve(address indexed _owner, address indexed _spender, uint256 _value);

    constructor(string memory _name, string memory _symbol, uint256 _totalSupply){
        name = _name;
        symbol = _symbol;
        totalSupply = _totalSupply;
        // 渡さないと誰もこのトークンを持ってないことになる
        balances[msg.sender] += totalSupply;
    }

    function balanceOf(address _owner) external view returns (uint256) {
        return balances[_owner];
    }

    // どれくらい使ったかわかる
    function allowance(address _owner, address _spender) public view returns(uint256) {
        return allowances[_owner][_spender];
    }

    // msg.senderから_toに_valueを送る
    function transfer(address _to, uint256 _value) external returns (bool) {
        _transfer(msg.sender, _to, _value);
        return true;
    }
    // _fromから_toに_valueを送る
    function transferFrom(address _from, address _to, uint256 _value) external returns (bool) {
        require(allowances[_from][msg.sender] >= _value, "Transefr Amount Exceeds Allowance");
        _transfer(_from, _to, _value);
        allowances[_from][msg.sender] -= _value;
        return true;
    }
    // transfer transferFrom で使うためのprivate関数
    function _transfer (address _from, address _to, uint256 _value) private {
        require(balances[_from] >= _value, "Insufficient Balance.. Check Out!");
        require(_from != _to, "Transfering address and Received address are the same..");
        balances[_from] -= _value;
        balances[_to] += _value;
        emit Transfer((_from), _to, _value);
    }

    // transferFromの穴、、どれだけトークンを動かしていいか決めるもの
    // msg.senderのものをspenderはどれだけ使っていいか許可する
    function approve(address _spender, uint256 _value) public returns(bool) {
        allowances[msg.sender][_spender] = _value;
        emit Approve(msg.sender, _spender, _value);
        return true;
    }   
}