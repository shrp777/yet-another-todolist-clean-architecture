import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { IFindTasks } from "@application/ports/in/IFindTasks";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";

export class FindTasks implements IFindTasks {
  constructor(private readonly repository: ITaskRepository) {}

  async execute(): Promise<Array<TaskResponse>> {
    return (await this.repository.findAll()).map((t) => ({
      id: t.id,
      content: t.content,
      status: t.status,
    }));
  }
}
