const MarketplaceCourse = artifacts.require("Marketplace")
const { expectRevert } = require('@openzeppelin/test-helpers');
contract("MarketplaceCourse", accounts => {


    _contract = null;
    const [owner, costumer1, costumer2, costumer3] = [accounts[0], accounts[1], accounts[2], accounts[3]]
    const courseID = "0x00000000000000000000000000000313"
    const proof = "0x0000000000000000000000000000000000000000000000000000000000003130"
    const value = "9000000000"

    before(async () => {

        _contract = await MarketplaceCourse.deployed()



    })

    describe("Purchase the new course", () => {
        let courseHashContract;

        before(async () => {

            await _contract.purchaseCourse(courseID, proof,
                {
                    from: costumer1,
                    value: value
                })


        })

        it("should own course", async () => {
            courseHashContract = await _contract.getCourseHash(0)

            const compareHash = web3.utils.soliditySha3(

                { type: "bytes16", value: courseID },
                { type: "address", value: costumer1 }
            )

            assert.equal(compareHash, courseHashContract, "Courses hashes must match to continue tests!")


        })


        it("should show match the data of the purchased course by buyer", async () => {
            const ownedCourse = await _contract.getCourse(courseHashContract)


            assert.equal(ownedCourse.id, 0, "owned course id should be 0!")
            assert.equal(ownedCourse.price, value, `the course value shold be ${value}`)
            assert.equal(proof, ownedCourse.proof, `the course proof shold be ${proof}`)
            assert.equal(costumer1, ownedCourse.owner, `the course owner shold be ${costumer1}`)
            assert.equal(ownedCourse.state, 0, " course state must be - purchased")

        })

        it("only owner can activate the course", async () => {

            await expectRevert(_contract.activateCourse(courseHashContract, { from: costumer1 }),
                "Only owner"
            )


        })
        it("should activate the course", async () => {

            await _contract.activateCourse(courseHashContract, { from: owner })
            const ownedCourse = await _contract.getCourse(courseHashContract)
            const courseState = ownedCourse.state

            assert.equal(courseState, 1, "course should be state = activated")


        })

        it("only owner should transfer ownership", async () => {

            await expectRevert(_contract.transferOwnership(costumer2, { from: costumer1 })

                , "Only owner"
            )


        })

        it("should transfer ownership", async () => {

            await _contract.transferOwnership(costumer2, { from: owner })

            const newOwner = await _contract.owner()


            assert.equal(newOwner, costumer2, `new owner of the ${courseID} should be costumer1`)

        })

        it("should NOT be able to purchase the course twice", async () => {

            await expectRevert(_contract.purchaseCourse(courseID, proof,
                {
                    from: costumer1,
                    value: value
                })

                , "You have already purchased this course!"
            )

        })



    })

})
