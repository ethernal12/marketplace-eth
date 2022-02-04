export const createProof = web3 => (order, email) => {

    if(!email){
        return
    }
    const emailHash = web3.utils.sha3(email)

    const proof = web3.utils.soliditySha3(
      

        { type: "bytes32", value: order },
        { type: "bytes32", value: emailHash }
    )

    return proof


}
