pragma solidity ^0.4.6;


contract RegisterItems {

    struct Item {
        uint index;
        bytes32 serial;
        bytes32 name;
    }

    struct ItemOwner {
        uint index;
        address owner;
        bytes32[] itemList; // list of items
        mapping(bytes32 => Item) items; // random access by address and serial
        // add more non-key fields as needed
    }

    mapping(address => ItemOwner) public itemsOwners; // random access by owner address
    address[] public itemOwnerList; // list of owners that have items

    //log the events (indexed is paramater to search)
    // event LogNewOwner   (address indexed userAddress, uint index, address owner);
    // event LogNewItem    (address indexed userAddress, uint index, bytes32 serial, bytes32 name);
    // event LogUpdateItem (address indexed userAddress, uint index, bytes32 serial, bytes32 name);
    // event LogDeleteItem (address indexed userAddress, uint index, bytes32 serial, bytes32 name);

    function isOwner() public constant returns(bool isIndeed) {
        if (itemOwnerList.length == 0) {
            return false;
        }
        return (itemOwnerList[itemsOwners[msg.sender].index] == msg.sender);
    }

    function addItem(bytes32 _serial, bytes32 _name) public returns(bool success) {
        // checking for duplicates
        if (itemsOwners[msg.sender].owner == 0x00) {
            itemsOwners[msg.sender].owner = msg.sender;
            itemsOwners[msg.sender].index = itemOwnerList.push(msg.sender)-1;
        }
        //checking for duplicates
        if (itemsOwners[msg.sender].items[_serial].serial == 0x00) {
            itemsOwners[msg.sender].items[_serial].serial = _serial;
            itemsOwners[msg.sender].items[_serial].name = _name;
            itemsOwners[msg.sender].items[_serial].index = itemsOwners[msg.sender].itemList.push(_serial)-1;
            return true;
        }
        return false;
    }

    function getItem(bytes32 _serial) public constant returns(bytes32 serial, bytes32 name) {
        return(itemsOwners[msg.sender].items[_serial].serial, itemsOwners[msg.sender].items[_serial].name);
    }

    function getItemList() public constant returns(bytes32[] itemList) {
        return(itemsOwners[msg.sender].itemList);
    }

    function updateItemName(bytes32 _serial, bytes32 _name) public returns(bool success) {
        require(isOwner());
        itemsOwners[msg.sender].items[_serial].name = _name;
        return true;
    }

    function deleteItem(bytes32 _serial) public returns(bool success)
    {
        require(isOwner());
        uint rowToDelete = itemsOwners[msg.sender].items[_serial].index;
        bytes32 keyToMove = itemsOwners[msg.sender].itemList[itemsOwners[msg.sender].itemList.length-1];
        //delete the sersial from itemList
        itemsOwners[msg.sender].itemList[rowToDelete] = keyToMove;
        itemsOwners[msg.sender].items[keyToMove].index = rowToDelete;
        itemsOwners[msg.sender].itemList.length--;
        //delete the serial and name from mapping
        itemsOwners[msg.sender].items[_serial].serial = 0x00;
        itemsOwners[msg.sender].items[_serial].name = 0x00;
        return true;
    }

}
