import type { StopTaskDTO } from "@application/dtos/StopTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";

export interface IStopTask {
  execute(task: StopTaskDTO): Promise<TaskResponse>;
}
