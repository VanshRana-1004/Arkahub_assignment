import * as crypto from "crypto";

const API_URL = "http://localhost:3000/device/real/query";
const PATH = "/device/real/query";
const SECRET_TOKEN = "interview_token_123";

export async function SendRequest(batch : string[]){
    const timestamp=Date.now();
    const signature=crypto
        .createHash("md5")
        .update(PATH + SECRET_TOKEN + timestamp)
        .digest("hex");

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "timestamp": timestamp.toString(),
            "signature": signature,
        },
        body: JSON.stringify({
            sn_list: batch,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`HTTP ${response.status}: ${error}`);
    }

    const data = await response.json();
    return data;
}