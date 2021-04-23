export class Task {
  constructor(
    public title: string,
    public notes: string,
    public remindMe: Date,
    public done = false,
    public createdAt = new Date(),
    public id?: number
  ){}
}
