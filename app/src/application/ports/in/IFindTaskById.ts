import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { Task } from "@domain/entities/Task";

export interface IFindTaskById {
  execute(taskId: string): Promise<TaskResponse | null>;
}
