// import React, { useState } from "react";
// import { Actor, HttpAgent } from "@dfinity/agent/lib/cjs";

// const BitcoinBlockInfo = () => {
//   const [bitcoinBlock, setBitcoinBlock] = useState(null);
//   const [error, setError] = useState(null);

//   const getBitcoinBlockInfo = async () => {
//     try {
//       const actor = await Actor.createActor(canisterId, {
//         agent: new HttpAgent(),
//       });

//       const block = await actor.get_bitcoin_block();
//       setBitcoinBlock(block);
//     } catch (err) {
//       setError(err);
//     }
//   };

//   return (
//     <div>
//       <h1>Bitcoin Block Info</h1>
//       <button onClick={getBitcoinBlockInfo}>Get Block Info</button>
//       {bitcoinBlock && (
//         <div>
//           <p>ID: {bitcoinBlock?.id}</p>
//           <p>Height: {bitcoinBlock?.height}</p>
//           <p>Version: {bitcoinBlock?.version}</p>
//           <p>Timestamp: {bitcoinBlock?.timestamp}</p>
//           <p>Bits: {bitcoinBlock?.bits}</p>
//           <p>Nonce: {bitcoinBlock?.nonce}</p>
//           <p>Difficulty: {bitcoinBlock?.difficulty}</p>
//           <p>Merkle Root: {bitcoinBlock?.merkle_root}</p>
//           <p>Transaction Count: {bitcoinBlock?.tx_count}</p>
//           <p>Size: {bitcoinBlock?.size}</p>
//           <p>Weight: {bitcoinBlock?.weight}</p>
//           <p>Previous Block Hash: {bitcoinBlock?.previousblockhash}</p>
//         </div>
//       )}
//       {error && <p>Error: {error}</p>}
//     </div>
//   );
// };

// export default BitcoinBlockInfo;
