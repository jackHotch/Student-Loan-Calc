import { Controller, Param, Patch } from '@nestjs/common';
import { CronService } from './cron.service';

@Controller('cron')
export class CronController {
  constructor(private readonly cronService: CronService) {}

  @Patch()
  proccessPendingPaymentsForAllLoans() {
    return this.cronService.processAllPendingPayments();
  }

  @Patch('/:id')
  proccessPendingPaymentsForOneLoans(@Param('id') id: string) {
    return this.cronService.processAllPendingPayments(BigInt(id));
  }
}
