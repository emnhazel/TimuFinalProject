// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Injectable ,UnauthorizedException} from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { Users } from './user.model';
import {sign,verify} from  'jsonwebtoken';
import { compareSync, hashSync } from "bcrypt";


@Injectable()
export class UserService {

    constructor(private readonly postgresService: PostgresService) {}
    private readonly refreshToken: string[] = [];

    private readonly jwtSecretKey = 'gjdphak'

    async register(user: Users): Promise<Users> {
      const emailExistsQuery = 'SELECT * FROM users WHERE email = $1';
      const emailExistsValues = [user.email];
      const emailExistsResult = await this.postgresService.executeQuery(emailExistsQuery, emailExistsValues);
  
  
      if (emailExistsResult?.rows?.length > 0) {
        throw new Error('Email already exists');
      }
  
      const hashedPassword = hashSync(user.password, 10);
      const insertQuery = 'INSERT INTO users (email, password,username) VALUES ($1, $2 ,$3) RETURNING *';
      const insertValues = [user.email, hashedPassword,user.username];
  
      return await this.postgresService.executeQuery(insertQuery, insertValues);
    }
  
  
    
    async login(user: Users): Promise<any> {
  
      const userFromDb: any = await this.getUserByEmail(user.email);
     
  
      if (!(userFromDb.length > 0) || !compareSync(user.password, userFromDb[0].password)) {
        return await {message : 'Invalid User Credintals' }
      }
  
      const accessToken = sign({ userId: userFromDb.id }, this.jwtSecretKey, { expiresIn: "1h" });
      const refreshToken = sign({ userId: userFromDb.id }, this.jwtSecretKey);
      this.refreshToken.push(refreshToken);
      return { accessToken, refreshToken, userFromDb };
    }

    
  async getUserById(id: number): Promise<Users> {
  
    const query = 'SELECT * FROM user WHERE id = $1';
    const values = [id];
    return this.postgresService.executeQuery(query, values);
  }

    async updateSettings(user: Users): Promise<Users> {
      const query = 'UPDATE users SET username = $1, email = $2, firstname = $3, lastname = $4, address = $5 WHERE id = $6 RETURNING *';

      const values = [user.username, user.email, user.firstname, user.lastname, user.address, user.id];
      return this.postgresService.executeQuery(query, values);
      
    }

    async refreshTokens(refreshToken: string): Promise<string> {
      if (!this.refreshToken.includes(refreshToken)) {
        throw new Error("Invalid refresh token");
      }
  
      const decoded = verify(refreshToken, this.jwtSecretKey) as { userId: number };
      return sign({ userId: decoded.userId }, this.jwtSecretKey, { expiresIn: "1h" });
    }
  
    async verifyToken(token: string): Promise<{ isValid: boolean; userId?: number }> {
      try {
        const decoded = verify(token, this.jwtSecretKey) as { userId: number };
        return { isValid: true, userId: decoded.userId };
      } catch (error) {
        return { isValid: false };
      }
    }
  
    private async getUserByEmail(email: string): Promise<Users | null> {
      const query = 'SELECT * FROM users WHERE email = $1';
      const values = [email];
      return await this.postgresService.executeQuery(query, values);
    }
}
