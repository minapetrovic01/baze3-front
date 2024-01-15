export class UserDto {
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    job: string;

    constructor(username: string, name: string, surname: string, email: string, password: string, job: string) {
        this.username = username;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.job = job;
    }
}