import { describe, test, expect, mock } from "bun:test";
import { StopTask } from "@application/use-cases/StopTask";
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

describe("StopTask Use Case", () => {
  test("marks the task as TODO and persists it", async () => {
    const task = new Task("Pause work", "DOING");
    const repository = createMockRepository(task);
    const useCase = new StopTask(repository);

    const result = await useCase.execute({
      id: task.id!,
      content: task.content,
      status: task.status,
    });

    expect(repository.findOneById).toHaveBeenCalledWith(task.id!);
    expect(repository.update).toHaveBeenCalled();
    expect(result.status).toBe("TODO");
  });

  test("throws when the task is not found", async () => {
    const repository = createMockRepository(null);
    const useCase = new StopTask(repository);

    expect(
      useCase.execute({ id: "unknown", content: "x", status: "DOING" })
    ).rejects.toThrow("Task unknown not found");
  });
});
