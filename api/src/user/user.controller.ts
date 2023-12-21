import { Controller, Post, Body, NotFoundException, InternalServerErrorException, Get ,Put, Param} from '@nestjs/common';
import { UserService } from './user.service';
import { Users} from './user.model';
import { PostgresService } from 'src/postgres/postgres.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly postgreService:PostgresService
    
    ) {}

  @Get('test')
  async test(){
    const query = 'SELECT * FROM users';
      return await this.postgreService.executeQuery(query);
  }

  @Get(':id')
  async getFactoryById(@Param('id') id: number): Promise<Users> {
    return await this.userService.getUserById(id);
  }


  @Post('login')
  async login(@Body() body:  Users): Promise<any> {
    try {
      
      const user = await this.userService.login(body);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      
      console.error(error);
      throw new InternalServerErrorException('Internal server error');
    }
  }

@Post('register')
async register(@Body() user: Users): Promise<Users> {
  return this.userService.register(user);
}

@Put('update-settings')
async updateSettings(@Body() user: Users): Promise<Users> {
  return this.userService.updateSettings(user);
}

}


