import { Alternative } from "./alternative";
import { Criteria } from "./criteria";
import { Tag } from "./tag";
import { User } from "./user";

export class Decision {
    id: number;
    name: string;
    description: string;
    date: Date;
    alternatives: Alternative[];
    criterias: Criteria[];
    tags: Tag[];
    owner:User; 

    constructor(id: number, name: string, description: string, date: Date, alternatives: Alternative[], criterias: Criteria[], tags: Tag[],owner:User) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.alternatives = alternatives;
        this.criterias = criterias;
        this.tags = tags;
        this.owner = owner;
    }
}