import { Decision } from "./decision";

export class Alternative {
    id: number;
    name: string;
    percentage: number;
    decision: Decision;

    constructor(id: number, name: string, percentage: number, decision: Decision) {
        this.id = id;
        this.name = name;
        this.percentage = percentage;
        this.decision = decision;
    }
}