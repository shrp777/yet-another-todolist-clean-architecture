import { describe, test, expect, mock } from "bun:test";
import { CompleteTask } from "@application/use-cases/CompleteTask";
import { Task } from "@domain/entities/Task";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";

function createMockRepository(task: Task | null = null): ITaskRepository {
  return {
    create: mock(),
    update: mock(async (dto) => {
      const t = new Task(dto.content, dto.status);
      Object.defineProperty(t, "id", { value: dto.id });
      return t;
    }),
    remove: mock(),
    findAll: mock(),
    findOneById: mock(async () => task),
  } as unknown as ITaskRepository;
}

describe("CompleteTask Use Case", () => {
  test("marks the task as DONE and persists it", async () => {
    const task = new Task("Finish homework");
    const repository = createMockRepository(task);
    const useCase = new CompleteTask(repository);

    const result = await useCase.execute({
      id: task.id!,
      content: task.content,
      status: task.status,
    });

    expect(repository.findOneById).toHaveBeenCalledWith(task.id!);
    expect(repository.update).toHaveBeenCalled();
    expect(result.status).toBe("DONE");
  });

  test("throws when the task is not found", async () => {
    const repository = createMockRepository(null);
    const useCase = new CompleteTask(repository);

    expect(
      useCase.execute({ id: "unknown", content: "x", status: "TODO" })
    ).rejects.toThrow("Task unknown not found");
  });
});
