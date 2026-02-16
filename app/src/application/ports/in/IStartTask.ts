import type { StartTaskDTO } from "@application/dtos/StartTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { Task } from "@domain/entities/Task";

export interface IStartTask {
  execute(task: StartTaskDTO): Promise<TaskResponse>;
}
