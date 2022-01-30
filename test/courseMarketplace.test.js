const MarketplaceCourse = artifacts.require("Marketplace")
const { expectRevert } = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');
const { catchRevert } = require("./utils/exceptions")
contract("MarketplaceCourse", accounts => {


    _contract = null;

    const [owner, costumer1, costumer2, costumer3, owner2] = [accounts[0], accounts[1], accounts[2], accounts[3], accounts[4]]
    const toBN = value => web3.utils.toBN(value)
    const getBalance = async address => await web3.eth.getBalance(costumer1)

    const getGas = async result => {

        const txHash = await web3.eth.getTransaction(result.tx)
        const gasUsed = toBN(result.receipt.gasUsed)
        const gasPrice = toBN(txHash.gasPrice)

        const gas = toBN(gasUsed.mul(gasPrice))

        return gas
    }


    const courseID = "0x00000000000000000000000000000313"
    const courseID2 = "0x00000000000000000000000000002130"
    const proof = "0x0000000000000000000000000000000000000000000000000000000000003130"
    const proof2 = "0x0000000000000000000000000000213000000000000000000000000000002130"
    const value = "9000000000"
    const hash = "0x0000000000000000000000000000000000000000000000000000000000000000"
    let courseHashContract;

    before(async () => {

        _contract = await MarketplaceCourse.deployed()

    })

    describe("Purchase the new course", () => {


        before(async () => {

            await _contract.purchaseCourse(courseID, proof,
                {
                    from: costumer1,
                    value: value
                })


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



    })
    describe("activate the course", () => {
        it("only owner can activate the course", async () => {

            await expectRevert(_contract.activateCourse(courseHashContract, { from: costumer1 }),
                "Only owner"
            )


        })
        it("should activate the course", async () => {

            await _contract.activateCourse(courseHashContract, { from: owner })
            const ownedCourse = await _contract.getCourse(courseHashContract)


            assert.equal(ownedCourse.state, 1, "course should be state = activated")


        })


    })
    describe("transfer ownership'", () => {




        it("only owner should transfer ownership", async () => {

            await expectRevert(_contract.transferOwnership(costumer2, { from: costumer1 })

                , "Only owner"
            )


        })
        //-------------------------------------------transfer ownership of the contract or the course ?-----------------------------
        it("should transfer ownership", async () => {

            await _contract.transferOwnership(owner2, { from: owner })

            const newOwner = await _contract.owner()


            assert.equal(newOwner, owner2, `new owner of the ${courseID} should be owner2`)

        })
    })



    describe("deactivate course'", () => {

        let courseHash2 = null
        before(async () => {

            await _contract.purchaseCourse(courseID2, proof2,
                {
                    from: costumer1,
                    value: value
                })

            courseHash2 = await _contract.getCourseHash(1)

        })

        it("should be able to deactivate the course purchase only by the owner", async () => {

            await expectRevert(_contract.deactivateCourse(courseHash2, { from: costumer3 })

                , "Only owner"
            )


        })


        it("should not be able to deactivate the course if it doesnt exist", async () => {

            await expectRevert(_contract.deactivateCourse(hash, { from: owner2 })

                , "The course purchase does not exist!"
            )


        })

        it("should be able to deactivate the course purchase", async () => {

            await _contract.deactivateCourse(courseHash2, { from: owner2 })

            const ownedCourse = await _contract.getCourse(courseHash2)


            assert.equal(ownedCourse.state, 2, "The course state should be Deactivated")
            assert.equal(ownedCourse.price, 0, "The course price should be 0")

        })
        it("should NOT be able to activate deactivated course", async () => {


            await catchRevert(_contract.activateCourse(courseHash2, { from: owner2 }))

        })

    })

    describe("repurchase course", () => {
        let courseHash2 = null
        before(async () => {



            courseHash2 = await _contract.getCourseHash(1)

        })


        it("should be able to repurchase deactivated course", async () => {
            let balanceBeforeTX = await getBalance(costumer1)
            const result = await _contract.repurchaseCourse(courseHash2, { from: costumer1, value: value })

            const gas = await getGas(result)


            let balanceAfterTX = await getBalance(costumer1)


            const ownedCourse = await _contract.getCourse(courseHash2)

            assert.equal(ownedCourse.state, 0, "repurchased course state must be Purchased")
            assert.equal(ownedCourse.price, value, "repurchased course price must be value")
            assert.equal(toBN(balanceBeforeTX).sub(toBN(value)).sub(gas).toString(), balanceAfterTX,
                "the balances do NOT match"

            )

        })

    })







})
