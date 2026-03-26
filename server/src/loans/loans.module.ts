import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { PaymentScheduleModule } from 'src/payment-schedule/payment-schedule.module';
import { CronModule } from 'src/cron/cron.module';

@Module({
  controllers: [LoansController],
  providers: [LoansService],
  imports: [PaymentScheduleModule, CronModule],
  exports: [LoansService],
})
export class LoansModule {}
