// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameCharacter1155 is ERC1155, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => string) private _uris;
    mapping(uint256 => uint256) private _prices;

    uint256[] private _allTokenIds;

    constructor() ERC1155("") Ownable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4) {}

    function uploadCharacter(string memory tokenURI, uint256 price) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _setTokenUri(newItemId, tokenURI);
        _setTokenPrice(newItemId, price);
        _allTokenIds.push(newItemId);
        return newItemId;
    }

    function buyCharacter(uint256 tokenId) public payable {
        uint256 price = _prices[tokenId];
        require(price > 0, "Character not for sale");
        require(msg.value >= price, "Ether sent is not correct");

        _mint(msg.sender, tokenId, 1, "");
    }

    function _setTokenUri(uint256 tokenId, string memory tokenURI) internal {
        _uris[tokenId] = tokenURI;
    }

    function _setTokenPrice(uint256 tokenId, uint256 price) internal {
        _prices[tokenId] = price;
    }

    function uri(uint256 tokenId) override public view returns (string memory) {
        return _uris[tokenId];
    }

    function getCharacters() public view returns (uint256[] memory, string[] memory, uint256[] memory) {
        string[] memory uris = new string[](_allTokenIds.length);
        uint256[] memory prices = new uint256[](_allTokenIds.length);
        for (uint256 i = 0; i < _allTokenIds.length; i++) {
            uris[i] = _uris[_allTokenIds[i]];
            prices[i] = _prices[_allTokenIds[i]];
        }
        return (_allTokenIds, uris, prices);
    }

    function getUserCharacters(address user) public view returns (uint256[] memory) {
        uint256[] memory result = new uint256[](_allTokenIds.length);
        for (uint256 i = 0; i < _allTokenIds.length; i++) {
            result[i] = balanceOf(user, _allTokenIds[i]);
        }

        return result;
    }
    
    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
