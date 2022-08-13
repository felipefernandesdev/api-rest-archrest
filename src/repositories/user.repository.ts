import { db } from '../db';
import User from '../models/user.model';

class UserRepository {
  async findAllUsers(): Promise<User[]> {
    const query = `SELECT id, username FROM api_users`;
    const { rows } = await db.query<User[]>(query);
    return rows || [];
  }
  async findById(id: string): Promise<User[]> {
    const query = `SELECT id, username FROM api_users WHERE id = $1`;
    const value = [id];
    const { rows } = await db.query<User[]>(query, value);
    const [user] = rows;
    return user;
  }

  async create(user: User): Promise<string> {
    const script = `INSERT INTO api_users (
      username,
      password
    ) VALUES ($1, crypt($2, $3))
    RETURNING id
    `;
    const values = [user.username, user.password, process.env.SALT_PASS];
    const { rows } = await db.query<{ id: string }>(script, values);
    const [newUser] = rows;
    return newUser.id;
  }

  async update(user: User): Promise<void> {
    const script = `UPDATE api_users SET
      username = $1,
      password = crypt($2, $3)
    WHERE id=$4
    `;
    const values = [
      user.username,
      user.password,
      process.env.SALT_PASS,
      user.id,
    ];
    await db.query<{ id: string }>(script, values);
  }

  async remove(id: string): Promise<void> {
    const script = `DELETE FROM api_users WHERE id=$1`;
    const values = [id];
    await db.query<{ id: string }>(script, values);
  }
}

export default new UserRepository();
