export class Topic {
  static toXML(newTopic: Topic): string {
    return `
      <topic id="${newTopic.id}" idAccount="${newTopic.idAccount}">
        <problem>${newTopic.problem}</problem>
        <description>${newTopic.description}</description>
        <updatedAt>${newTopic.updatedAt.toISOString()}</updatedAt>
        <createdAt>${newTopic.createdAt.toISOString()}</createdAt>
      </topic>
    `;
  }
  constructor(
    public id: number = 0,
    public idAccount: number = 0,
    public problem: string = "",
    public description: string = "",
    public updatedAt: Date,
    public createdAt: Date
  ) {}

  public static fromJson(json: {
    id: number;
    idAccount: number;
    problem: string;
    description: string;
    updatedAt: Date;
    createdAt: Date;
  }): Topic {
    return new Topic(
      json.id,
      json.idAccount,
      json.problem,
      json.description,
      new Date(json.updatedAt),
      new Date(json.createdAt)
    );
  }

  public static fromXML(xml: Element): Topic {
    return new Topic(
      parseInt(xml.getAttribute("id") || "0"),
      parseInt(xml.getAttribute("idAccount") || "0"),
      xml.getElementsByTagName("problem")[0]?.textContent || "",
      xml.getElementsByTagName("description")[0]?.textContent || "",
      new Date(xml.getElementsByTagName("updatedAt")[0]?.textContent || ""),
      new Date(xml.getElementsByTagName("createdAt")[0]?.textContent || "")
    );
  }
}

export class SolutionStep {
  static toXML(step: SolutionStep): string {
    return `
      <solutionStep id="${step.id}" idTopic="${step.idTopic}">
        <title>${step.title}</title>
        <description>${step.description}</description>
        <updatedAt>${step.updatedAt.toISOString()}</updatedAt>
      </solutionStep>
    `;
  }
  constructor(
    public id: number = 0,
    public idTopic: number = 0,
    public title: string = "",
    public description: string = "",
    public updatedAt: Date
  ) {}

  public static fromJson(json: {
    id: number;
    idTopic: number;
    title: string;
    description: string;
    updatedAt: Date;
  }): SolutionStep {
    return new SolutionStep(
      json.id,
      json.idTopic,
      json.title,
      json.description,
      new Date(json.updatedAt)
    );
  }

  public static fromXML(xml: Element): SolutionStep {
    return new SolutionStep(
      parseInt(xml.getElementsByTagName("id")[0].textContent || "0"),
      parseInt(xml.getElementsByTagName("idTopic")[0].textContent || "0"),
      xml.getElementsByTagName("title")[0].textContent || "",
      xml.getElementsByTagName("description")[0].textContent || "",
      new Date(xml.getElementsByTagName("updatedAt")[0].textContent || "")
    );
  }
}

export class Vote {
  constructor(
    public id: number = 0,
    public idTopic: number = 0,
    public idAccount: number = 0,
    public isPositive: boolean
  ) {}

  public static fromJson(json: {
    id: number;
    idTopic: number;
    idAccount: number;
    isPositive: boolean;
  }): Vote {
    return new Vote(json.id, json.idTopic, json.idAccount, json.isPositive);
  }

  public static fromXML(xml: Element): Vote {
    return new Vote(
      parseInt(xml.getElementsByTagName("id")[0].textContent || "0"),
      parseInt(xml.getElementsByTagName("idTopic")[0].textContent || "0"),
      parseInt(xml.getElementsByTagName("idAccount")[0].textContent || "0"),
      xml.getElementsByTagName("isPositive")[0].textContent === "1"
    );
  }
}
