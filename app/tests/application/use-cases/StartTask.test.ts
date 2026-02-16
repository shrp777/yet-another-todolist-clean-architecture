import { describe, test, expect, mock } from "bun:test";
import { StartTask } from "@application/use-cases/StartTask";
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

describe("StartTask Use Case", () => {
  test("marks the task as DOING and persists it", async () => {
    const task = new Task("Start coding");
    const repository = createMockRepository(task);
    const useCase = new StartTask(repository);

    const result = await useCase.execute({ id: task.id });

    expect(repository.findOneById).toHaveBeenCalledWith(task.id);
    expect(repository.update).toHaveBeenCalled();
    expect(result.status).toBe("DOING");
  });

  test("throws when the task is not found", async () => {
    const repository = createMockRepository(null);
    const useCase = new StartTask(repository);

    expect(
      useCase.execute({ id: "unknown" })
    ).rejects.toThrow("Task unknown not found");
  });
});
