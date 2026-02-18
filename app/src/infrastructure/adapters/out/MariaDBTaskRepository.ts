import type { CreateTaskDTO } from "@application/dtos/CreateTaskDTO";
import type { UpdateTaskDTO } from "@application/dtos/UpdateTaskDTO";
import type { ITaskRepository } from "@application/ports/out/ITaskRepository";
import { Task } from "@domain/entities/Task";
import type { TaskStatus } from "@domain/entities/TaskStatus";
import mysql, { type Pool, type RowDataPacket } from "mysql2/promise";

interface TaskRow extends RowDataPacket {
  id: string;
  content: string;
  status: TaskStatus;
}

export class MariaDBTaskRepository implements ITaskRepository {
  private pool: Pool;

  constructor() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    });
  }

  async create(task: CreateTaskDTO): Promise<Task> {
    const newTask = new Task(task.content);
    await this.pool.execute(
      "INSERT INTO tasks (id, content, status) VALUES (?, ?, ?)",
      [newTask.id, newTask.content, newTask.status]
    );
    return newTask;
  }

  async update(task: UpdateTaskDTO): Promise<Task> {
    await this.pool.execute(
      "UPDATE tasks SET content = ?, status = ? WHERE id = ?",
      [task.content, task.status, task.id]
    );
    return new Task(task.content, task.status, task.id);
  }

  async remove(taskId: string): Promise<boolean> {
    const [result] = await this.pool.execute("DELETE FROM tasks WHERE id = ?", [
      taskId
    ]);
    return (result as any).affectedRows > 0;
  }

  async findAll(): Promise<Array<Task>> {
    const [rows] = await this.pool.execute<TaskRow[]>("SELECT * FROM tasks");
    return rows.map((row) => new Task(row.content, row.status, row.id));
  }

  async findOneById(taskId: string): Promise<Task | null> {
    const [rows] = await this.pool.execute<TaskRow[]>(
      "SELECT * FROM tasks WHERE id = ?",
      [taskId]
    );
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Task(row?.content ?? "", row?.status ?? "TODO", row?.id);
  }
}
