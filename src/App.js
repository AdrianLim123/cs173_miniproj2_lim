import { useState, useEffect } from "react";
import { connectWallet, getAccount } from "./utils/wallet";
import { fetchStorage } from "./utils/tzkt";
import { setBalanceOwnerEscrow, setBalanceCPEscrow, claimOwner, claimCP, enableWithdrawOwner, finalizeWithdraw, enableWithdrawCP} from "./utils/operation";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [deposit_owner, setBalanceOwner] = useState(0);
  const [deposit_cp, setBalanceCP] = useState(0);
  const [expect_owner, setBalanceFromOwner] = useState(0);
  const [expect_cp, setBalanceFromCP] = useState(0);
  const [input_owner, changedInputOwner] = useState('');
  const [input_cp, changedInputCP] = useState('');
  const [hash, changedHashCP] = useState('');
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      const storage = await fetchStorage();
      setBalanceOwner(storage.balanceOwner)
      setBalanceCP(storage.balanceCounterparty);
      setBalanceFromOwner(storage.fromOwner);
      setBalanceFromCP(storage.fromCounterparty);
      const account = await getAccount();
      setAccount(account);
    })();
  }, []);


  const onConnectWallet = async () => {
    await connectWallet();
    const account = await getAccount();
    setAccount(account);
  };


  const depositOwner = async () => {
    try{
      await setBalanceOwnerEscrow(parseInt(input_owner, 10));
      const storage = await fetchStorage();
      setBalanceOwner(storage.balanceOwner)
      setBalanceCP(storage.balanceCounterparty);
    }
    catch(err){
      throw err;
    }
  };
  
  const depositCP = async () => {
    try{
      await setBalanceCPEscrow(parseInt(input_cp, 10));
      const storage = await fetchStorage();
      setBalanceOwner(storage.balanceOwner)
      setBalanceCP(storage.balanceCounterparty);
    }
    catch(err){
      throw err;
    }
  };

  const claimToOwner = async () => {
    try{
      await claimOwner();
      const storage = await fetchStorage();
      setBalanceOwner(storage.balanceOwner)
      setBalanceCP(storage.balanceCounterparty);
    }
    catch(err){
      throw err;
    }
    
  }
  
  const claimToCP = async () => {
    try{
      await claimCP(hash);
      const storage = await fetchStorage();
      setBalanceOwner(storage.balanceOwner)
      setBalanceCP(storage.balanceCounterparty);
    }
    catch(err){
      throw err;
    }
  }

  const withdrawOwner = async () => {
    try{
      await enableWithdrawOwner();
    }
    catch(err){
      throw err;
    }
  }

  const withdrawCP = async () => {
    try{
      await enableWithdrawCP();
    }
    catch(err){
      throw err;
    }
  }

  const withdrawNOW = async () => {
    try{
      await finalizeWithdraw();
    }
    catch(err){
      throw err;
    }
  }
  
  const handleChangeOwner = (event) => {
    changedInputOwner(event.target.value);
  };

  const handleChangeCP = (event) => {
    changedInputCP(event.target.value);
  };

  const handleChangeHash = (event) =>{
    changedHashCP(event.target.value);
  }
  return (
    <div className="h-100">
      <div>Enabled Wallet:</div>
        <button onClick={onConnectWallet} className="btn btn-outline-info">
            {/* TODO 5.a - Show account address if wallet is connected */}
            {account ? account : "Connect Wallet"}
          </button>
      <div className="d-flex flex-row align-items-center" style={{padding:40, justifyContent: 'space-between'}}>
        <div></div>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="py-1">Claim Funds (Owner)</div>
          <button onClick = {claimToOwner} className="btn btn-outline-info">
            Claim Owner
          </button>
          <div className="py-1">Claim Funds (Counterparty)</div>
          <form>
          <label>
            <textarea name="owner_amount" onChange={handleChangeHash}/>
          </label>
          </form>
          <button onClick = {claimToCP} className="btn btn-outline-info">
            Claim Counterparty
          </button>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
        <div className="py-1">Deposit Funds</div>
        <div className="py-1">Owner</div>
        <div>Amount (in mutez):</div>
        <form>
          <label>
            <textarea name="cp_amount" onChange={handleChangeOwner}/>
          </label>
        </form>
        <div>
          <button onClick={depositOwner} className="btn btn-outline-info">
              Submit
          </button>
          <button onClick={withdrawOwner} className="btn btn-outline-info">
              Enable Withdraw
          </button>
        </div>
        
        <div className="py-1">Counter Party</div>
        <div>Amount (in mutez):</div>
        <form>
          <label>
            <textarea name = "cp_amount" onChange={handleChangeCP}/>
          </label>
        </form>
        <div>
        <button onClick={depositCP} className="btn btn-outline-info">
            Submit
        </button>
        <button onClick={withdrawCP} className="btn btn-outline-info">
            Enable Withdraw
        </button>
        </div>
        
        </div>
        <div></div>
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div>Current Deposits (Keep refreshing)</div>
        <div>Owner: {deposit_owner}</div>
        <div>Counterparty: {deposit_cp}</div>
        <div>Expected Deposits</div>
        <div>Owner: {expect_owner}</div>
        <div>Counterparty: {expect_cp}</div>
        <div>
        <button onClick={withdrawNOW} className="btn btn-outline-info">
            Finalize Withdrawal
        </button>
        </div>
      </div>
    </div>
  );
};

export default App;
