// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract Marketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        uint256 id; //32 bytes
        uint256 price; //32 bytes
        bytes32 proof; // 32 bytes
        address owner; // 20 bytes
        State state; // 1 byte uint8=8bits
    }

    mapping(bytes32 => Course) private ownedCourses;

    mapping(uint256 => bytes32) private ownedCourseHash;
    //number of all courses and id of the courses
    uint256 totalCoursesOwned;

    address payable private owner;

    constructor(){

        setContractOwner(msg.sender);

    }

    //0x31343130343734
    //0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    //0x00000000000000000000000000000313
    //0x0000000000000000000000000000000000000000000000000000000000003130
    //address + courseId = 000000000000000000000000000031305B38Da6a701c568545dCfcB03FcB875f56beddC4

    //keccak256(abi.encodePacked(0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37))
    function purchaseCourse(
        bytes16 courseId, // 10 ascii - 3130 hex => 0x00000000000000000000000000003130 + 0x => 32 chars      0xc4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
        bytes32 proof
    ) external payable returns (bytes32) {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        require(!checkOwner(courseHash), "You have already purchased this course!");
        uint256 id = totalCoursesOwned++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });

        return courseHash;
    }

    function getCourse (bytes32 courseHash) 
    external
    view 
    returns(Course memory) {

        return ownedCourses[courseHash];
    }

    function getNumberOfCourses() external view returns(uint){
    

    return totalCoursesOwned;

    }

    function getOwner() external view returns (address){
        return owner;
    }

    function getCourseHash(uint id) external view returns(bytes32){


        return ownedCourseHash[id];
    }

    function checkOwner(bytes32 courseHash) private view returns(bool){
    
        address courseOwner = ownedCourses[courseHash].owner;
        

        return courseOwner == msg.sender;
        
    
    }

    function transferOwnership(address newOwner)external onlyOwner{

        setContractOwner(newOwner);
    }

    function setContractOwner(address newOwner) private {

        owner = payable(newOwner);
    }

    modifier onlyOwner(){

        require(msg.sender == owner, "Only owner");
        _;
    }




}
