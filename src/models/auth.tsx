export class AccessToken {
  constructor(
    public token: string = "",
    public refreshToken: string = "",
    public tokenDateExpired: Date = new Date(),
    public refreshTokenDateExpired: Date = new Date()
  ) {}
}

export class Account {
  constructor(
    public id: number = 0,
    public userName: string = "",
    public email: string = "",
    public password: string = ""
  ) {}

  public static fromJson(json: {
    id: number;
    user_name: string;
    email: string;
    password: string;
  }): Account {
    return new Account(json.id, json.user_name, json.email, json.password);
  }
}
