export class CreateUserDTO {
    readonly username;
    readonly password;
    readonly email;
}

export class LoginDTO {
    readonly email;
    readonly password;
}