// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract MedicalRecors {
    address public constant admin = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;

    address[] public HospitalAccount;
    mapping(address => address[]) public DoctorAccount;

    function addHospitalAccount(address _user) external {
        require(admin == msg.sender, "You don't have access");
        uint256 j = HospitalAccount.length;
        bool exist = false;
        while (j > 0) {
            if (HospitalAccount[j - 1] == _user) {
                exist = true;
                break;
            } else {
                j--;
            }
        }
        require(!exist, "This Account is Added");
        HospitalAccount.push(_user);
    }

    function addDoctorAccount(address _user) external {
        bool ExistHospitalAccount = false;
        for (uint256 j = 0; j < HospitalAccount.length; j++) {
            if (HospitalAccount[j] == msg.sender) {
                ExistHospitalAccount = true;
                break;
            }
        }
        require(ExistHospitalAccount, "You dont have Access Because Hospital Account Dont Exist");
        bool ExistDoctorAccount = false;
        for (uint256 j = 0; j < DoctorAccount[msg.sender].length; j++) {
            if (DoctorAccount[msg.sender][j] == _user) {
                ExistDoctorAccount = true;
                break;
            }
        }
        require(!ExistDoctorAccount, "You dont have Access to add Doctor Because exist");
        DoctorAccount[msg.sender].push(_user);
    }
}
