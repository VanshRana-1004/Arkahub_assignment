import { SendRequest } from "./route";
import fs from "fs";
import path from "path";

const REPORT_FILE = path.join(process.cwd(), "report.json");
if (!fs.existsSync(REPORT_FILE)) {
  fs.writeFileSync(REPORT_FILE, JSON.stringify([], null, 2));
} 

export class Queue{
    private queue : string[][]=[];
    private isProcessing : boolean=false;
    private requests : number=0; 

    enqueue(batch : string[]){
        this.queue.push(batch);
        this.process();
    }

    private async process(){
        if(this.isProcessing) return;
        this.isProcessing=true;

        while(this.queue.length>0){
            const batch=this.queue.shift();
            await this.handleBatch(batch);
            await this.sleep(1000);
        }

        this.isProcessing=false;
    }

    private async handleBatch(batch : string[] | undefined){
        if(!batch){
            console.log("No batch to process");
            return;
        } 
        const res=await SendRequest(batch);
        this.saveToJson(res);
        this.requests++;
        console.log('Batch Processed : ',this.requests);
        if(this.requests==50){
            console.log("All batches processed successfully, you can check the report.json file for details.");
        }
    }

    private saveToJson(data: {sn : string, power : string, status : string, last_updated : string}[]) {
        const fileData = fs.readFileSync(REPORT_FILE, "utf-8");
        const json = JSON.parse(fileData);

        json.push(data);

        fs.writeFileSync(REPORT_FILE, JSON.stringify(json, null, 2));
    }


    private sleep(ms : number){
        return new Promise(resolve => setTimeout(resolve,ms));
    }
}