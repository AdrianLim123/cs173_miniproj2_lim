import { tezos } from "./tezos";

const contract_location = "KT1MCtJf69KgtChNAMM6pzpFQ4TtMLMgagPT" //"KT1HeQbzgEqKgrdbU7tBPfQoAJffaF9ZCyKX"
export const claimOwner = async() => {
  try{
    const contractInstance = await tezos.wallet.at(contract_location);
    const op = await contractInstance.methods.claimOwner().send();
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
}

export const claimCP = async(fromCP) => {
  try{
    const contractInstance = await tezos.wallet.at(contract_location);
    const op = await contractInstance.methods.claimCounterparty(fromCP).send(); //correct hash: "01223344"
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
}

export const setBalanceOwnerEscrow = async (fromOwner) => {
  try{
    // Create Escrow instance
    const contractInstance = await tezos.wallet.at(contract_location);
    // Add balance of cp and owner
    const op = await contractInstance.methods.addBalanceOwner().send({
      amount: fromOwner,
      mutez: true
    });
    await op.confirmation(1);
    alert("Transaction successful.");
  } catch (err) {
    throw err;
  }
};

export const setBalanceCPEscrow = async (fromCP) => {
  try{
    // Create Escrow instance
    const contractInstance = await tezos.wallet.at(contract_location);
    // Add balance of cp and owner
    const op = await contractInstance.methods.addBalanceCounterparty().send({
      amount: fromCP,
      mutez: true,
    });
    await op.confirmation(1);
    alert("Transaction successful.");
  } catch (err) {
    throw err;
  }
};

export const enableWithdrawOwner = async() =>{
  try{
    // Create Escrow instance
    const contractInstance = await tezos.wallet.at(contract_location);
    // Add balance of cp and owner
    const op = await contractInstance.methods.enableWithdrawalOwner().send({});
    await op.confirmation(1);
    alert("Transaction successful.");
  } catch (err) {
    throw err;
  }
};

export const enableWithdrawCP = async() =>{
  try{
    // Create Escrow instance
    const contractInstance = await tezos.wallet.at(contract_location);
    // Add balance of cp and owner
    const op = await contractInstance.methods.enableWithdrawalCounterparty().send({});
    await op.confirmation(1);
    alert("Transaction successful.");
  } catch (err) {
    throw err;
  }
};

export const finalizeWithdraw = async() =>{
  try{
    // Create Escrow instance
    const contractInstance = await tezos.wallet.at(contract_location);
    // Add balance of cp and owner
    const op = await contractInstance.methods.performWithdrawal().send({});
    await op.confirmation(1);
    alert("Transaction successful.");
  } catch (err) {
    throw err;
  }
};