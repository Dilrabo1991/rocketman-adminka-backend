import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { UsersModule } from './commons/user/users.module';
import { RolesModule } from './commons/role/roles.module';
import { AuthModule } from './commons/auth/auth.module';
import { Role } from './commons/role/entities/role.entity';
import { User } from './commons/user/entities/user.entity';
import { ShopsModule } from './modules/shops/shops.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { DriversModule } from './modules/drivers/drivers.module';
import { CustomersModule } from './modules/customers/customers.module';
import { shops } from './modules/shops/entities/shop.entity';
import { categories } from './modules/categories/entities/category.entity';
import { Driver } from './modules/drivers/entities/driver.entity';
import { Customer } from './modules/customers/entities/customer.entity';
import { FoodTypesModule } from './modules/food-types/food-types.module';
import { foodTypes } from './modules/food-types/entities/food-type.entity';
import { FoodsModule } from './modules/foods/foods.module';
import { foods } from './modules/foods/entities/food.entity';
import { order } from './modules/orders/entities/orders.entity';
import { OrdersModule } from './modules/orders/orders.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { Question } from './modules/questions/entities/question.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Role,
        shops,
        categories,
        Driver,
        Customer,
        foodTypes,
        foods,
        order,
        Question
      ],
      synchronize: true,
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    ShopsModule,
    CategoriesModule,
    DriversModule,
    CustomersModule,
    FoodTypesModule,
    FoodsModule,
    OrdersModule,
    QuestionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
