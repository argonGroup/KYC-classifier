/*
 * KYC Address Classifier Smart Contract.  Copyright © 2018 by Argon Investments Management.
 * Author: Mikhail Vladimirov <mikhail.vladimirov@gmail.com>
 */
pragma solidity ^0.4.20;

import "./AddressClassifier.sol";

/**
 * KYC Address Classifier Smart Contract that that classifies addresses for KYC
 * checks.
 */
contract KYCAddressClassifier is AddressClassifier {
  /**
   * Create new KYC Address Classifier smart contract and make the owner of
   * given address to be the owner of smart contract.
   *
   * @param _owner address of an owner of smart contract
   */
  function KYCAddressClassifier (address _owner) public {
    owner = _owner;
  }

  /**
   * Classify given address.
   *
   * @param _address address to be classified
   * @return class of given address
   */
  function classifyAddress (address _address) public view returns (uint256) {
    return addressClasses [_address];
  }

  /**
   * Set class for given address.
   *
   * @param _address address to set class for
   * @param _class class to set for given address
   */
  function setAddressClass (address _address, uint256 _class) public {
    if (msg.sender == owner) {
      // Owner may do anything
    } else {
      require (_class == 0 || classPermissions [_class][msg.sender]);
      uint256 oldClass = addressClasses [_address];
      require (
        oldClass == 0 ||
          addressOwners [_address] == msg.sender &&
          classPermissions [oldClass][msg.sender]);
    }

    address newOwner = _class == 0 ? address (0) : msg.sender;
    if (addressClasses [_address] != _class ||
      addressOwners [_address] != newOwner) {
      addressClasses [_address] = _class;
      addressOwners [_address] = newOwner;

      AddressClassification (msg.sender, _address, _class);
    }
  }

  /**
   * Set permission for the owner of given address to edit given class.
   *
   * @param _class class to set permission to edit
   * @param _owner owner to set permission to edit given class for
   * @param _permission true to enable given owner to edit class, false to
   *        disable
   */
  function setClassPermission (uint256 _class, address _owner, bool _permission)
    public {
    require (msg.sender == owner);
    require (_class != 0);

    if (classPermissions [_class][_owner] != _permission) {
      classPermissions [_class][_owner] = _permission;
      ClassPermissionChange (_class, _owner, _permission);
    }
  }

  /**
   * Address of the owner of smart contract.
   */
  address internal owner;

  /**
   * Maps address to its class.
   */
  mapping (address => uint256) internal addressClasses;

  /**
   * Maps address to its owner, i.e. to the one who classified this address.
   */
  mapping (address => address) internal addressOwners;

  /**
   * Maps class to a mapping that holds permissions for adding addresses to this
   * list.  If classPermissions [class][owner] is true, than owner is permitted
   * to add addresses to given class.
   */
  mapping (uint256 => mapping (address => bool)) internal classPermissions;

  /**
   * Logged when address classification was changed.
   *
   * @param owner owner that changed address classification
   * @param addr address classification was changed for
   * @param class new class of given address
   */
  event AddressClassification (
    address indexed owner, address indexed addr, uint256 indexed class);

  /**
   * Logged when permission of given owner to edit given class was changed.
   *
   * @param class class permission to edit was changed for
   * @param owner owner permission to edit given class was changed for
   * @param permission true if premission was granted, false if it was revoked
   */
  event ClassPermissionChange (
    uint256 indexed class, address indexed owner, bool permission);
}
