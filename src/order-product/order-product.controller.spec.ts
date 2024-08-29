import { Test, TestingModule } from '@nestjs/testing';
import { OrderProductController } from './order-product.controller';

describe('OrderProductController', () => {
  let controller: OrderProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderProductController],
    }).compile();

    controller = module.get<OrderProductController>(OrderProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
