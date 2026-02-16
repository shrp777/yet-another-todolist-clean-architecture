import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { IFindTaskById } from "@application/ports/in/IFindTaskById";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import type { Task } from "@domain/entities/Task";

export class FindTaskById implements IFindTaskById {
  constructor(private readonly repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute(taskId: string): Promise<TaskResponse | null> {
    const foundTask = await this.repository.findOneById(taskId);
    if (foundTask) return foundTask.toDTO();
    return null;
  }
}
