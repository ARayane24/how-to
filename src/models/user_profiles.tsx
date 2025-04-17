export class Profile {
  constructor(
    public id: number = 0,
    public idAccount: number = 0,
    public firstName: string = "",
    public midName: string = "",
    public lastName: string = "",
    public joined: Date,
    public profilePicture: string = "",
    public bio: string = ""
  ) {}

  public static fromJson(json: {
    id: number;
    idAccount: number;
    first_name: string;
    mid_name: string;
    last_name: string;
    joined: string;
    profile_picture: string;
    bio: string;
  }): Profile {
    return new Profile(
      json.id,
      json.idAccount,
      json.first_name,
      json.mid_name,
      json.last_name,
      new Date(json.joined),
      json.profile_picture,
      json.bio
    );
  }

  public getFullName(): string {
    return `${this.firstName} ${this.midName} ${this.lastName}`;
  }

  public static fromXML(xml: Element): Profile {
    return new Profile(
      parseInt(xml.getElementsByTagName("id")[0].textContent || "0"),
      parseInt(xml.getElementsByTagName("idAccount")[0].textContent || "0"),
      xml.getElementsByTagName("first_name")[0].textContent || "",
      xml.getElementsByTagName("mid_name")[0].textContent || "",
      xml.getElementsByTagName("last_name")[0].textContent || "",
      new Date(xml.getElementsByTagName("joined")[0].textContent || ""),
      xml.getElementsByTagName("profile_picture")[0].textContent || "",
      xml.getElementsByTagName("bio")[0].textContent || ""
    );
  }
}
