import type { TaskResponse } from "@application/dtos/TaskResponse";
import type { IFindTaskById } from "@application/ports/in/IFindTaskById";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";

export class FindTaskById implements IFindTaskById {
  constructor(private readonly repository: ITaskRepository) {}

  async execute(taskId: string): Promise<TaskResponse | null> {
    const foundTask = await this.repository.findOneById(taskId);
    if (foundTask) return { id: foundTask.id, content: foundTask.content, status: foundTask.status };
    return null;
  }
}
