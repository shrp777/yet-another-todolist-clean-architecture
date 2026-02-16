import type { CompleteTaskDTO } from "@application/dtos/CompleteTaskDTO";
import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import type { ICompleteTask } from "@application/ports/in/ICompleteTask";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import type { Task } from "@domain/entities/Task";

export class CompleteTask implements ICompleteTask {
  constructor(private readonly repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute(task: CompleteTaskDTO): Promise<TaskResponse> {
    const foundTask: Task | null = await this.repository.findOneById(task.id);
    if (foundTask) {
      foundTask.markAsCompleted();
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
