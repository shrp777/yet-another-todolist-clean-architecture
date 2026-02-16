import type { StartTaskDTO } from "@application/dtos/StartTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import type { IStartTask } from "@application/ports/in/IStartTask";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import type { Task } from "@domain/entities/Task";

export class StartTask implements IStartTask {
  constructor(private readonly repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute(task: StartTaskDTO): Promise<TaskResponse> {
    const foundTask: Task | null = await this.repository.findOneById(task.id);
    if (foundTask) {
      foundTask.start();
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
