import { Alternative } from "./alternative";
import { Criteria } from "./criteria";
import { User } from "./user";

export class Decision {
    id: number;
    name: string;
    description: string;
    date: Date;
    alternatives: Alternative[];
    criterias: Criteria[];
    owner:User; 

    constructor(id: number, name: string, description: string, date: Date, alternatives: Alternative[], criterias: Criteria[], owner:User) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.alternatives = alternatives;
        this.criterias = criterias;
        this.owner = owner;
    }
}