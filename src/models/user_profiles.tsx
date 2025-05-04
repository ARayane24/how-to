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
    firstName: string;
    midName: string;
    lastName: string;
    joined: string;
    profile_picture: string;
    bio: string;
  }): Profile {
    return new Profile(
      json.id,
      json.idAccount,
      json.firstName,
      json.midName,
      json.lastName,
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
      parseInt(xml.getAttribute("id") || "0"),
      parseInt(xml.getAttribute("idAccount") || "0"),
      xml.getElementsByTagName("firstName")[0]?.textContent || "",
      "", // midName is not present in the XML
      xml.getElementsByTagName("lastName")[0]?.textContent || "",
      new Date(xml.getElementsByTagName("joined")[0]?.textContent || ""),
      xml.getElementsByTagName("profilePicture")[0]?.textContent || "",
      xml.getElementsByTagName("bio")[0]?.textContent || ""
    );
  }

  public static toXML(profile : Profile){
    return `
     <userProfile id="${profile.id}" idAccount="${profile.idAccount}">
      <firstName>${profile.firstName}</firstName>
      <lastName>${profile.lastName}</lastName>
      <profilePicture>${profile.profilePicture} </profilePicture>
      <bio>${profile.bio}</bio>
      <joined>${profile.joined}</joined>
    </userProfile>
    `;
  }
}
