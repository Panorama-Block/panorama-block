import fetch from "node-fetch";
import mempoolJS from "@mempool/mempool.js";

const initWebSocketClient = async (azleCanisterUrl: string) => {
  const {
    bitcoin: { websocket },
  } = mempoolJS({
    hostname: "mempool.space",
  });

  const ws = websocket.initServer({
    options: ["blocks", "stats", "mempool-blocks", "live-2h-chart"],
  });

  ws.on("message", async (data: { toString: () => string; }) => {
    const res = JSON.parse(data.toString());

    if (res.block) {
      await sendToAzleCanister(azleCanisterUrl, "updateHashblocks", res.block);
    }
    if (res.mempoolInfo) {
      await sendToAzleCanister(
        azleCanisterUrl,
        "updateMempoolInfo",
        res.mempoolInfo
      );
    }
    if (res.transactions) {
      await sendToAzleCanister(
        azleCanisterUrl,
        "updateTransactions",
        res.transactions
      );
    }
    if (res["mempool-blocks"]) {
      await sendToAzleCanister(
        azleCanisterUrl,
        "updateMempoolBlocks",
        res["mempool-blocks"]
      );
    }
  });
};

const sendToAzleCanister = async (url: string, method: string, data: any) => {
  try {
    const response = await fetch(`${url}/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Log the raw response text if not a successful response
      const text = await response.text();
      console.error(`Server returned an error: ${text}`);
      throw new Error(`Server returned an error: ${response.status}`);
    }

    const result = await response.json();
    console.log(`Sent to ${method}:`, result);
  } catch (error) {
    console.error(`Error sending to ${method}:`, error);
  }
};

const azleCanisterUrl = "http://localhost:8000";
initWebSocketClient(azleCanisterUrl);
