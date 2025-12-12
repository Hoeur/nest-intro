import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUsersDto } from './dtos/create-users.dto';
import { GetUsersParamsDto } from './dtos/get.users.params.dto';
import { PatchUsersDto } from './dtos/patch-users.dto';
import { UsersService } from './providers/users.service';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ApiQuery({ name: 'limit', required: false, example: 10 })
  @ApiQuery({ name: 'offset', required: false, example: 0 })
  public getUsers(
    @Param() getUserParamDto: GetUsersParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('offset', new DefaultValuePipe(0), ParseIntPipe) offset: number,
  ) {
    return this.usersService.findAll(getUserParamDto, limit, offset);
  }

  @Get(':id')
  public getUser(@Param('id') id: number) {
    return this.usersService.findOneById(id);
  }

  @Post()
  @ApiBody({ type: CreateUsersDto })
  public createUsers(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @Patch()
  public patchUser(@Body() patchUsersDto: PatchUsersDto) {
    console.log(patchUsersDto);
    return patchUsersDto;
  }
}
