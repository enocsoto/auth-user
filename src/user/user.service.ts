import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity, 'sesions-db')
    private readonly userRepository: Repository<UserEntity>) { }
  
  async create(createUserDto: CreateUserDto) {
    createUserDto.userName = createUserDto.userName.toLocaleLowerCase();
    try {
      const user = await this.userRepository.save(createUserDto);
      return user;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: string) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    
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
