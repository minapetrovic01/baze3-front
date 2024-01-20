export class UserDto {
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    job: string;
    supportNumber: number;

    constructor(username: string, name: string, surname: string, email: string, password: string, job: string,supportNumber: number) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.supportNumber = supportNumber;
        this.job = job;
    }
}