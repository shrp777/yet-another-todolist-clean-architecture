import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { Task } from "@domain/entities/Task";

export interface IFindTasks {
  execute(): Promise<Array<TaskResponse>>;
}
