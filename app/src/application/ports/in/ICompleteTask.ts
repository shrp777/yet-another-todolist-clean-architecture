import type { CompleteTaskDTO } from "@application/dtos/CompleteTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";

export interface ICompleteTask {
  execute(task: CompleteTaskDTO): Promise<TaskResponse>;
}
