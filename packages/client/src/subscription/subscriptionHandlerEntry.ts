import { NodeId } from "opcjs-base";

export class SubscriptionHandlerEntry{
    constructor(
        public subscriptionId:number,
        public handle: number, 
        public id:NodeId, 
        public callback: (data: { id: NodeId, value: unknown }[]) => void
    ){}
}