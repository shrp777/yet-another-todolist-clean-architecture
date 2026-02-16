import type { StopTaskDTO } from "@application/dtos/StopTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import type { IStopTask } from "@application/ports/in/IStopTask";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import type { Task } from "@domain/entities/Task";

export class StopTask implements IStopTask {
  constructor(private readonly repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute(task: StopTaskDTO): Promise<TaskResponse> {
    const foundTask: Task | null = await this.repository.findOneById(task.id);
    if (foundTask) {
      foundTask.stop();
      const dto: UpdateTaskDTO = {
        id: foundTask.id!,
        status: foundTask.status,
        content: foundTask.content
      };
      const updatedTask = await this.repository.update(dto);
      return updatedTask.toDTO();
    } else {
      throw Error(`Task ${task.id} not found`);
    }
  }
}
