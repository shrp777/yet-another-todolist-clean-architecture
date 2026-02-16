import { describe, test, expect, mock } from "bun:test";
import { FindTaskById } from "@application/use-cases/FindTaskById";
import { Task } from "@domain/entities/Task";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";

function createMockRepository(task: Task | null = null): ITaskRepository {
  return {
    create: mock(),
    update: mock(),
    remove: mock(),
    findAll: mock(),
    findOneById: mock(async () => task),
  } as unknown as ITaskRepository;
}

describe("FindTaskById Use Case", () => {
  test("returns the DTO when the task is found", async () => {
    const task = new Task("Found task");
    const repository = createMockRepository(task);
    const useCase = new FindTaskById(repository);

    const result = await useCase.execute(task.id);

    expect(repository.findOneById).toHaveBeenCalledWith(task.id);
    expect(result).toEqual({
      id: task.id,
      content: "Found task",
      status: "TODO",
    });
  });

  test("returns null when the task is not found", async () => {
    const repository = createMockRepository(null);
    const useCase = new FindTaskById(repository);

    const result = await useCase.execute("nonexistent-id");

    expect(result).toBeNull();
  });
});
