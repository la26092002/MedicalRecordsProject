// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract MedicalRecors {
    address public constant admin = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    address[] public HospitalAccount;
    mapping(address => address[]) public DoctorAccount;
    address[] public DoctorsAddress;

    mapping(address => EHR[]) public Ehr; //address [patient];

    mapping(address => address[]) public AccesDoctor; //AccesDoctor[patient]=[doctor]
    mapping(address => address[]) public AccesHospital; //AccesDoctor[patient]=[hospital]
    struct EHR {
        address doctor;
        address hospitaAccount;
        uint256 id;
        string data;
    }

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
        require(
            ExistHospitalAccount,
            "You dont have Access Because Hospital Account Dont Exist"
        );
        bool ExistDoctorAccount = false;
        for (uint256 j = 0; j < DoctorAccount[msg.sender].length; j++) {
            if (DoctorAccount[msg.sender][j] == _user) {
                ExistDoctorAccount = true;
                break;
            }
        }
        require(
            !ExistDoctorAccount,
            "You dont have Access to add Doctor Because exist"
        );
        DoctorAccount[msg.sender].push(_user);
        DoctorsAddress.push(_user);
    }

    function createEhr(
        address _patient,
        address _doctorHospitalAccount,
        string memory _data
    ) external {
        for (uint256 j = 0; j < DoctorsAddress.length; j++) {
            // DoctorAccount
            if (DoctorsAddress[j] == msg.sender) {
                // Create a new EHR instance
                EHR memory newEhr;
                newEhr.doctor = msg.sender;
                newEhr.hospitaAccount = _doctorHospitalAccount;
                newEhr.id = Ehr[_patient].length;
                newEhr.data = _data;

                // Push the new EHR to the patient's EHR list
                Ehr[_patient].push(newEhr);
            }
        }
    }

    function concatenateStrings(string memory _a, string memory _b)
        public
        pure
        returns (string memory)
    {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory ab = new string(_ba.length + _bb.length);
        bytes memory bab = bytes(ab);
        uint256 k = 0;
        for (uint256 i = 0; i < _ba.length; i++) bab[k++] = _ba[i];
        for (uint256 j = 0; j < _bb.length; j++) bab[k++] = _bb[j];
        return string(bab);
    }

    function ModifyEhr(
        address _patient,
        uint256 _id,
        string memory _data
    ) external {
        for (uint256 i = 0; i < Ehr[_patient].length; i++) {
            if (Ehr[_patient][i].id == _id) {
                Ehr[_patient][i].data = concatenateStrings(
                    Ehr[_patient][i].data,
                    _data
                );
            }
        }
    }

    //AccesDoctor
    function accessDoctor(address _doctor) external {
        bool access = false;
        for (uint256 i = 0; i < AccesDoctor[msg.sender].length; i++) {
            if (AccesDoctor[msg.sender][i] == _doctor) {
                access = true;
            }
        }
        if (access == false) {
            AccesDoctor[msg.sender].push(_doctor);
        }
    }

    function accessHospital(address _hospital) external {
        bool access = false;
        for (uint256 i = 0; i < AccesHospital[msg.sender].length; i++) {
            if (AccesDoctor[msg.sender][i] == _hospital) {
                access = true;
            }
        }
        if (access == false) {
            AccesHospital[msg.sender].push(_hospital);
        }
    }
}
