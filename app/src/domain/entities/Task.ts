import type { TaskStatus } from "./TaskStatus";

export class Task {
  constructor(
    public content: string,
    public status: TaskStatus = "TODO",
    public readonly id?: string
  ) {
    if (!content || content === "") {
      throw new Error("Task content must be completed");
    }

    if (this.id === undefined) this.id = Bun.randomUUIDv7();
  }

  markAsCompleted(): void {
    if (this.status === "TODO" || this.status === "DOING") this.status = "DONE";
    else throw new Error("Task is already done.");
  }

  start(): void {
    if (this.status === "TODO") this.status = "DOING";
    else if (this.status === "DOING") throw new Error("Task is already doing.");
    else throw new Error("Task is already done.");
  }

  stop(): void {
    if (this.status === "DOING") this.status = "TODO";
    else if (this.status === "TODO") throw new Error("Task is not started.");
    else throw new Error("Task is already done.");
  }
}
