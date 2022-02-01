// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Marketplace {
    enum State {
        Purchased,
        Activated,
        Deactivated
    }

    struct Course {
        bytes32 courseHash;
        uint256 id; //32 bytes
        uint256 price; //32 bytes
        bytes32 proof; // 32 bytes
        address owner; // 20 bytes
        State state; // 1 byte uint8=8bits
    }

    mapping(bytes32 => Course) private ownedCourses;

    mapping(uint256 => bytes32) private ownedCourseHash;

    uint256 totalCoursesOwned;

    address payable public owner;

    constructor() {
        setContractOwner(msg.sender);
    }

    /// Cannot activate deactivated course, must me repurchased first!
    error DeactivateCourse();

    function purchaseCourse(
        bytes16 courseId, // 10 ascii - 3130 hex => 0x00000000000000000000000000003130 + 0x => 32 chars
        bytes32 proof
    ) external payable returns (bytes32) {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));
        require(
            !checkOwner(courseHash),
            "You have already purchased this course!"
        );
        uint256 id = totalCoursesOwned++;
        ownedCourseHash[id] = courseHash;
        ownedCourses[courseHash] = Course({
            courseHash: courseHash,
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            state: State.Purchased
        });

        return courseHash;
    }

    function repurchaseCourse(bytes32 courseHash)
        external
        payable
        isCourseCreated(courseHash)
    {
        require(
            checkOwner(courseHash),
            "You are not the owner of the course, can`t repurchase"
        );
        Course storage course = ownedCourses[courseHash];

        require(
            course.state == State.Deactivated,
            "To purchase the course the state must be Deactivated"
        );
        course.state = State.Purchased;
        course.price = msg.value;
    }

    function activateCourse(bytes32 courseHash)
        external
        onlyOwner
        isCourseCreated(courseHash)
    {
        Course storage course = ownedCourses[courseHash];

        if (course.state == State.Deactivated) {
            revert DeactivateCourse();
        }

        require(
            course.state == State.Purchased,
            "Course is already activated!"
        );

        course.state = State.Activated;
    }

    function deactivateCourse(bytes32 courseHash)
        external
        onlyOwner
        isCourseCreated(courseHash)
    {
        Course storage course = ownedCourses[courseHash];

        require(
            course.state != State.Deactivated,
            "Course is already deactivated!"
        );

        (bool success, ) = course.owner.call{value: course.price}("");
        require(success, "Transfer to owner of the course failed");

        course.state = State.Deactivated;
        course.price = 0;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        setContractOwner(newOwner);
    }

    function withdrawFunds(uint amount) external onlyOwner {
        uint256 contractFunds = address(this).balance;
        require(contractFunds >= amount , "The withdraw amount is exceeding the contracts balance");
        (bool success, ) = owner.call{value: amount}("");
        require(success, "The transfer of funds was not successful!");
    }

    //------------------------------------------------------getter functions----------------------------------------------

    function getCourse(
        bytes32 courseHash //get course by hash
    ) external view returns (Course memory) {
        return ownedCourses[courseHash];
    }

    function getNumberOfCourses() external view returns (uint256) {
        return totalCoursesOwned;
    }

    function getOwner() external view returns (address) {
        return owner;
    }

    function getCourseHash(uint256 id) external view returns (bytes32) {
        return ownedCourseHash[id];
    }

    function checkOwner(bytes32 courseHash) private view returns (bool) {
        address courseOwner = ownedCourses[courseHash].owner;

        return courseOwner == msg.sender;
    }

    function setContractOwner(address newOwner) private {
        owner = payable(newOwner);
    }

    //------------------------------------------------------modifiers----------------------------------------------
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    modifier isCourseCreated(bytes32 _courseHash) {
        require(
            ownedCourses[_courseHash].owner !=
                0x0000000000000000000000000000000000000000,
            "The course purchase does not exist!"
        );
        _;
    }
}
