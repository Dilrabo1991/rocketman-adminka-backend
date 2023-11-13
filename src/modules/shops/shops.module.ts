import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { shops } from './entities/shop.entity';

@Module({
  imports: [TypeOrmModule.forFeature([shops])],
  controllers: [ShopsController],
  providers: [ShopsService]
})
export class ShopsModule {}
