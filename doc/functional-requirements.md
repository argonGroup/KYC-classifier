# KYC Address Classifier Smart Contract: Functional Requirements

This document describes functional requirements for KYC Address Classifier Smart Contract.

## 1. Introduction

KYC Address Classifier Smart Contract is an Ethereum smart contract that could be used to classify Ethereum addresses.
This smart contract is supposed to be used by KYC Transfer Authorizer Smart Contract that needs to classify origin and destination addresses of token transfers in order to authorize or deny them.

For any given Ethereum address, KYC Address Classifier returns numeric ID of the class this address currently belongs to.
Initially all addresses belong to a class with zero ID.

Address classification may be changed by an eligible party.
KYC applies the following procedure to decide whether particular user is eligible to change classification of particular address from particular current class to parcicular new class:

    if (user is the owner of smart contract) then
      allow classification change
    end if
    if (current class is not zero) then
      if (current class for the address was set by somebody other than user) then
        deny classification change
      end if
      if (user does not have permission to edit current class) then
        deny classification change
      end if
    end if
    if (new class is not zero) then
      if (user does not have permission to edit new class) then
        deny classification change
      end if
    end if
    allow classification change

In the following sections all use cases for KYC Address Classifier Smart Contract are described in details.

## 2. Use Cases

### 2.1. Deploy

**Actors:** _User_, _Smart Contract_

**Goal:** _User_ wants to deploy _Smart Contract_ and make the owner of given address to be the owner of _Smart Contract_

##### Main Flow:

1. _User_ deploys _Smart Contract_ passing the following information as constructor parameters: address of the owner of _Smart Contract_
2. _Smart Contract_ make the owner of given address to be the owner of _Smart Contract_

### 2.2. ClassifyAddress

**Actors:** _User_, _Smart Contract_

**Goal:** _User_ wants to know current of class of certain address

##### Main Flow:

1. _User_ calls constant method on _Smart Contract_ providing the following information as method parameters: address to get class of
2. _Smart Contract_ returns to _User_ ID of the class given address currently belongs to

### 2.3. SetAddressClass

**Actors:** _User_, _Smart Contract_

**Goal:** _User_ wants to set class for certain address

##### Main Flow:

1. _User_ calls method on _Smart Contract_ providing the following information as method parameters: address to set class for, new class for given address
2. _User_ is eligible to perform desired address classification change
3. Given class differs from current class of given address, or current class is not zero and was assigned to given address not by _User_
5. _Smart Contract_ assigns given class to given address
6. _Smart Contract_ logs address classification event with given information: _User_ address, address whose classification was changed, new class of the address

##### Exceptional Flow 1:

1. Same as in Main Flow
2. _User_ is not eligible to perform desired address classification change
3. _Smart Contract_ cancels transaction

##### Exception Flow 2:

1. Same as in Main Flow
2. Same as in Main Flow
3. Given class is the same as current class of given address and current class is zero or was assigned by _User_
4. _Smart Contract_ does nothing

### 2.4. SetClassPermission

**Actors:** _User_, _Smart Contract_

**Goal:** _User_ wants to modify permission for the owner of certain address to edit certain class

##### Main Flow:

1. _User_ calls constant method on _Smart Contract_ providing the following information as method parameters: ID of the class to modify permission for, address to modify permission for the owner or, new permission (allow or deny)
2. _User_ is the owner of _Smart Contract_
3. Given class ID is not zero
4. Current permission of the owner of given address to edit given class differs from given new permission
5. _Smart Contract_ modifies permission of the owner of given address foe editing class with given ID to given new permission
6. _Smart Contract_ logs class permission change event with the following information: class permission was modified for, address permission was modified for the owner of, new permission

##### Exceptional Flow 1:

1. Same as in Main Flow
2. _User_ is not the owner of _Smart Contract_
3. _Smart Contract_ cancels transaction

##### Exceptional Flow 2:

1. Same as in Main Flow
2. Same as in Main Flow
3. Given class ID is zero
4. _Smart Contract_ cancels transaction

##### Exceptional Flow 3:

1. Same as in Main Flow
2. Same as in Main Flow
3. Same as in Main Flow
4. Current permission of the owner of given address to edit given class is the same as give new permission
5. _Smart Contract_ does nothing
