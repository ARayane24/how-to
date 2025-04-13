export class Topic {
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
}

export class SolutionStep {
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
}
