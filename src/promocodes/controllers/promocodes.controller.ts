import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { PromocodesService } from '../services/promocodes.service';
import { CreatePromocodeDto } from '../dto/create-promocode.dto';
import { ActivatePromocodeDto } from '../dto/activate-promocode.dto';
import { PromocodeResponseDto } from '../dto/promocode-response.dto';
import { ActivationResponseDto } from '../dto/activation-response.dto';

@ApiTags('Promocodes')
@Controller('promocodes')
export class PromocodesController {
  constructor(private readonly promocodesService: PromocodesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать промокод' })
  @ApiResponse({
    status: 201,
    description: 'Промокод успешно создан',
    type: PromocodeResponseDto,
  })
  async create(
    @Body() createPromocodeDto: CreatePromocodeDto,
  ): Promise<PromocodeResponseDto> {
    const promocode = await this.promocodesService.create(createPromocodeDto);
    return plainToInstance(PromocodeResponseDto, promocode, {
      excludeExtraneousValues: true,
    });
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех промокодов' })
  @ApiResponse({
    status: 200,
    description: 'Список промокодов',
    type: [PromocodeResponseDto],
  })
  async findAll(): Promise<PromocodeResponseDto[]> {
    const promocodes = await this.promocodesService.findAll();
    return plainToInstance(PromocodeResponseDto, promocodes, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить промокод по ID' })
  @ApiParam({ name: 'id', description: 'ID промокода' })
  @ApiResponse({
    status: 200,
    description: 'Промокод найден',
    type: PromocodeResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Промокод не найден' })
  async findOne(@Param('id') id: string): Promise<PromocodeResponseDto> {
    const promocode = await this.promocodesService.findById(id);
    return plainToInstance(PromocodeResponseDto, promocode, {
      excludeExtraneousValues: true,
    });
  }

  @Post('activate')
  @ApiOperation({ summary: 'Активировать промокод' })
  @ApiResponse({
    status: 200,
    description: 'Промокод успешно активирован',
    type: ActivationResponseDto,
  })
  async activate(
    @Body() activatePromocodeDto: ActivatePromocodeDto,
  ): Promise<ActivationResponseDto> {
    const activation = await this.promocodesService.activate(
      activatePromocodeDto,
    );
    return plainToInstance(ActivationResponseDto, activation, {
      excludeExtraneousValues: true,
    });
  }
}
