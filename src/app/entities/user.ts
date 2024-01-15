import { Decision } from "./decision";
import { Subscription } from "./subscription";

export class User {
    id: number;
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    job: string;
    decisions: Decision[];
    subscriptions: Subscription[];
    subscribers: Subscription[];

    constructor(id: number, username: string, name: string, surname: string, email: string, password: string, job: string, decisions: Decision[], subscriptions: Subscription[], subscribers: Subscription[]) {
        this.id = id;
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.job = job;
        this.decisions = decisions;
        this.subscriptions = subscriptions;
        this.subscribers = subscribers;
    }
}