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

  public static fromXML(xml: Element): Account {
    return new Account(
      parseInt(xml.getElementsByTagName("id")[0].textContent || "0"),
      xml.getElementsByTagName("user_name")[0].textContent || "",
      xml.getElementsByTagName("email")[0].textContent || "",
      xml.getElementsByTagName("password")[0].textContent || ""
    );
  }
}
