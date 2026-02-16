import { describe, test, expect, beforeEach } from "bun:test";
import { TaskRepository } from "@infrastructure/adapters/out/TaskRepository";

describe("TaskRepository (in-memory)", () => {
  let repository: TaskRepository;

  beforeEach(() => {
    repository = new TaskRepository();
  });

  describe("create", () => {
    test("adds and returns a task", async () => {
      const task = await repository.create({ content: "New task" });

      expect(task.id).toBeDefined();
      expect(task.content).toBe("New task");
      expect(task.status).toBe("TODO");
    });
  });

  describe("findAll", () => {
    test("returns all tasks", async () => {
      await repository.create({ content: "Task 1" });
      await repository.create({ content: "Task 2" });

      const tasks = await repository.findAll();

      expect(tasks).toHaveLength(2);
    });

    test("returns an empty array when no tasks exist", async () => {
      const tasks = await repository.findAll();
      expect(tasks).toEqual([]);
    });
  });

  describe("findOneById", () => {
    test("returns the task when found", async () => {
      const created = await repository.create({ content: "Find me" });

      const found = await repository.findOneById(created.id!);

      expect(found).not.toBeNull();
      expect(found!.content).toBe("Find me");
    });

    test("returns null when not found", async () => {
      const found = await repository.findOneById("nonexistent");
      expect(found).toBeNull();
    });
  });

  describe("update", () => {
    test("updates an existing task", async () => {
      const created = await repository.create({ content: "Old content" });

      const updated = await repository.update({
        id: created.id!,
        content: "New content",
        status: "DOING",
      });

      expect(updated.content).toBe("New content");
      expect(updated.status).toBe("DOING");
    });

    test("throws when the task is not found", async () => {
      expect(
        repository.update({ id: "unknown", content: "x", status: "TODO" })
      ).rejects.toThrow("Task unknown not found");
    });
  });

  describe("remove", () => {
    test("removes a task", async () => {
      const created = await repository.create({ content: "Delete me" });

      const result = await repository.remove(created.id!);

      expect(result).toBe(true);
      const found = await repository.findOneById(created.id!);
      expect(found).toBeNull();
    });
  });
});
