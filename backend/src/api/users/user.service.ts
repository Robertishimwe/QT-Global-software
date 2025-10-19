import { v4 as uuidv4 } from 'uuid';
import db from '../../config/database';
import { hashEmail, signData, getPublicKey } from '../../services/crypto.service';


export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | string;
  status: 'active' | 'inactive';
  createdAt: string;
  signature: string;
  publicKey: string;
}


type CreateUserData = Omit<User, 'id' | 'createdAt' | 'signature' | 'publicKey'>;

type UpdateUserData = Partial<Omit<User, 'id' | 'createdAt' | 'signature' | 'publicKey'>>;


export const createUserService = (userData: CreateUserData): Promise<User> => {
  return new Promise((resolve, reject) => {
    const { email, role, status } = userData;
    
    // cryptographic operations
    const emailHash = hashEmail(email);
    const signature = signData(emailHash);
    const publicKey = getPublicKey();

    const newUser: User = {
      id: uuidv4(),
      email,
      role,
      status,
      createdAt: new Date().toISOString(),
      signature,
      publicKey,
    };

    const sql = `
      INSERT INTO users (id, email, role, status, createdAt, signature, publicKey) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [newUser.id, newUser.email, newUser.role, newUser.status, newUser.createdAt, newUser.signature, newUser.publicKey];

    db.run(sql, params, function (err) {
      if (err) {
        console.error('Database error in createUserService:', err.message);
        reject(err);
      } else {
        resolve(newUser);
      }
    });
  });
};


export const findAllUsersService = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users';
    db.all(sql, [], (err, rows: User[]) => {
      if (err) {
        console.error('Database error in findAllUsersService:', err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};


export const findUserByIdService = (id: string): Promise<User | null> => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.get(sql, [id], (err, row: User) => {
            if (err) {
                console.error('Database error in findUserByIdService:', err.message);
                reject(err);
            } else {
                resolve(row || null);
            }
        });
    });
};

export const updateUserService = async (id: string, updateData: UpdateUserData): Promise<User | null> => {
    const userToUpdate = await findUserByIdService(id);
    if (!userToUpdate) {
        return null; // User not found
    }

    // Prepare data for the SQL query
    const updates = { ...updateData };
    let newSignature: string | undefined;

    // If email is being changed, we MUST regenerate the signature
    if (updates.email) {
        const emailHash = hashEmail(updates.email);
        newSignature = signData(emailHash);
    }

    return new Promise((resolve, reject) => {
        const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
        const values = Object.values(updates);
        
        let sql = `UPDATE users SET ${fields}`;
        
        // Add the new signature to the query if it was generated
        if (newSignature) {
            sql += `, signature = ?`;
            values.push(newSignature);
        }
        
        sql += ` WHERE id = ?`;
        values.push(id);
        
        db.run(sql, values, async function (err) {
            if (err) {
                console.error('Database error in updateUserService:', err.message);
                reject(err);
            } else if (this.changes === 0) {
                resolve(null); // Should not happen if we already found the user, but as a safeguard.
            } else {
                // Fetch and return the updated user object
                const updatedUser = await findUserByIdService(id);
                resolve(updatedUser);
            }
        });
    });
};

export const deleteUserService = (id: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        db.run(sql, [id], function(err) {
            if (err) {
                console.error('Database error in deleteUserService:', err.message);
                reject(err);

            } else {
                // this.changes contains the number of rows affected.
                // If > 0, the deletion was successful.
                resolve(this.changes > 0);
            }
        });
    });
};

export const getUserCreationStatsService = (): Promise<Array<{ date: string; count: number }>> => {
  return new Promise((resolve, reject) => {
    // 1. Calculate the date 7 days ago in YYYY-MM-DD format
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const startDate = sevenDaysAgo.toISOString().split('T')[0];

    // 2. SQL query to count users grouped by creation date
    const sql = `
      SELECT
        DATE(createdAt) as date,
        COUNT(*) as count
      FROM
        users
      WHERE
        DATE(createdAt) >= ?
      GROUP BY
        date
      ORDER BY
        date ASC;
    `;

    db.all(sql, [startDate], (err, rows: Array<{ date: string; count: number }>) => {
      if (err) {
        console.error('Database error in getUserCreationStatsService:', err.message);
        return reject(err);
      }

      // 3. Create a map for easy lookup of counts by date
      const countsByDate = new Map(rows.map(row => [row.date, row.count]));

      // 4. Generate the final array for all of the last 7 days, filling in zeros
      const result = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        const dateString = d.toISOString().split('T')[0];

        result.push({
          date: dateString,
          count: countsByDate.get(dateString) || 0,
        });
      }
      
      resolve(result);
    });
  });
};