export const compareProof = web3 => (courseHash, email, proof) => {
    const emailToHash = web3.utils.sha3(email)

    const createProof = web3.utils.soliditySha3(
        	
        { type: "bytes32", value: courseHash },
        { type: "bytes32", value: emailToHash }


    )
    return createProof === proof


}