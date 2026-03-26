import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { PaymentScheduleModule } from 'src/payment-schedule/payment-schedule.module';
import { SimulationsModule } from 'src/simulations/simulations.module';

@Module({
  imports: [PaymentScheduleModule, SimulationsModule],
  controllers: [CronController],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
