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
}
