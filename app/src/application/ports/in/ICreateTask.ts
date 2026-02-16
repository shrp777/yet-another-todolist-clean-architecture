import type { CreateTaskDTO } from "@application/dtos/CreateTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { Task } from "@domain/entities/Task";

export interface ICreateTask {
  execute(taskDTO: CreateTaskDTO): Promise<TaskResponse>;
}
