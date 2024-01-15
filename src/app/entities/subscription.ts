import { User } from "./user";

export class Subscription {
    id: number;
    subscribee: User;
    subscriber: User;

    constructor(id: number, subscribee: User, subscriber: User) {
        this.id = id;
        this.subscribee = subscribee;
        this.subscriber = subscriber;
    }

}