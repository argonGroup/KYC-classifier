# KYC Address Classifier Smart Contract: API

This document describes API of KYC Address Classifier Smart Contract

## 1. Constructors

### 1.1. KYCAddressClassifier(address)

##### Signature:

    function KYCAddressClassifier (address _owner) public

##### Description:

Deploy KYC Address Classifier smart contract and make the owner of given `_owner` address to be the owner of smart contract.
May be called by anyone.
Does not accept ether.

##### Use Cases:

* Deploy

## 2. Methods

### 2.1. classifyAddress(address)

##### Signature:

    function classifyAddress (address _address) public view returns (uint256)

##### Description:

Get ID of a class given address `_address` currently belongs to.
May be called by anyone.
Does not accept ether.

##### Use Cases

* ClassifyAddress

### 2.2. setAddressClass(address,uint256)

##### Signature:

    function setAddressClass (address _address, uint256 _class) public

##### Description:

Set new class `_class` for given address `_address`.
May be called by users eligible to perform desired classification change.
Does not accept ether.

##### Use Cases:

* SetAddressClass

### 2.3. setClassPermission(uint256,address,bool)

##### Signature:

    function setClassPermission (
      uint256 _class, address _owner, bool _permission)
    public

##### Description:

Set permission of the owner of given address `_owner` for editing class with given ID `_class` to value `_permission`.
May be called by the owner of smart contract only.
Does not accept ether.

##### Use Cases:

* SetClassPermission

## 3. Events

### 3.1. AddressClassification(address,address,uint256)

##### Signature:

    event AddressClassification (
      address indexed owner, address indexed addr, uint256 indexed class)

##### Description:

Logged when class of given address `addr` was changed by the owner of address `owner` to the new class with ID `class`.

##### Use Cases:

* SetAddressClass

### 3.2. ClassPermissionChange (uint256,address,bool)

##### Signature:

    event ClassPermissionChange (
      uint256 indexed class, address indexed owner, bool permission)

##### Description:

Logged when permission of the owner of address `owner` for editing class with ID `class` was changed to a new value `permission`.

##### Use Cases:

* SetClassPermission

