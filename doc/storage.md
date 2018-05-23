# KYC Address Classifier Smart Contract: Storage

This document describes storage structure of KYC Address Classifier Smart Contract.

## 1. Fields

### 1.1. owner

##### Signature:

    address internal owner;

##### Description:

Address of the owner of smart contract.

##### Used in Use Cases:

* SetAddressClass
* SetClassPermission

##### Modified in Use Cases:

* Deploy

### 1.2. addressClasses

##### Signature:

    mapping (address => uint256) internal addressClasses;

##### Description:

Maps address to ID of the class this address belongs to.

##### Used in Use Cases:

* ClassifyAddress
* SetAddressClass

##### Modified in Use Cases:

* SetAddressClass

### 1.3. addressOwners

##### Signature:

    mapping (address => address) internal addressOwners;

##### Description:

Maps address belonging to a class with non-zero ID to the address of the user who assigned current class to this address.

##### Used in Use Cases:

* SetAddressClass

##### Modified in Use Cases:

* SetAddressClass

### 1.4. classPermissions

##### Signature:

    mapping (uint256 => mapping (address => bool)) internal classPermissions;

##### Description:

Maps class and address to permission the owner of the address has for editing the class.

##### Used in Use Cases:

* SetAddressClass
* SetClassPermission

##### Modified in Use Cases:

* SetClassPermission
