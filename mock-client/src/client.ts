import { Queue } from "./queue";

function FetchInfo(){

    // generating a list of dummy_solar_invertors from 0 to 499 
    const dummy_solar_invertors : string[]=Array.from({length:500},(_,i)=>{
        return String(i).length==1 ? `SN-00${i}` : String(i).length==2 ? `SN-0${i}` : `SN-${i}` 
    });

    // create batches, each of size 10
    const batches : string[][]=[];
    for(let i=0;i<500;i+=10){
        batches.push(dummy_solar_invertors.slice(i,i+10));
    }

    // push all the batches in a custom queue
    const queue=new Queue();
    for(const batch of batches){
        queue.enqueue(batch);
    } 
}

FetchInfo();