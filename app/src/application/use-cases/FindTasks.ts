import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { IFindTasks } from "@application/ports/in/IFindTasks";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import type { Task } from "@domain/entities/Task";

export class FindTasks implements IFindTasks {
  constructor(private readonly repository: ITaskRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Array<TaskResponse>> {
    return (await this.repository.findAll()).map((t) => t.toDTO());
  }
}
