import type { TaskByIdDTO } from "@application/dtos/TaskByIdDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";

export interface IStopTask {
  execute(task: TaskByIdDTO): Promise<TaskResponse>;
}
