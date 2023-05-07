import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MysqlProvider } from './provider/mysql.provider';
import { Pool } from 'mysql2/promise';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UserService {
  private readonly connection: Promise<Pool>;
  
  constructor() {
    this.connection = MysqlProvider.getInstance();
  }

  async findAll(): Promise<any> {
    try {
      const connection = await this.connection;
      const [rows] = await connection.execute('SELECT * FROM sesions.user;');
      return rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.user_name = createUserDto.user_name.toLocaleLowerCase();
    try {
      const connection = await this.connection;
      const [result] = await connection.execute(`INSERT INTO sesions.user (id, user_name, password) VALUES ('${uuid()}', '${createUserDto.user_name}', '${createUserDto.password}');`);
      (await this.connection).end()
      return result[0];
    } catch (error) {
     throw new InternalServerErrorException(error);
    }  
  }


  async findOne(id: string): Promise<any> {
    try {
      
      const connection = await this.connection;
      const [rows] = await connection.execute(`SELECT * FROM sesions.user WHERE id = ${id}`);
      return rows[0];
    } catch (error) {
      console.log(error);
      throw error;
      
    }  
  
  }

  async update(id: string, updateUserDto: UpdateUserDto) {

    try {
      const connection = await this.connection;
      await connection.execute('UPDATE mytable SET ? WHERE id = ?', [updateUserDto, id]);
      const [updated] = await connection.execute('SELECT * FROM mytable WHERE id = ?', [id]);
      return updated[0];
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000)
      throw new BadRequestException(`Pokemon exists in bd ${JSON.stringify(error.keyValue)}`);

    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Chek server Logs`)
  }
}
