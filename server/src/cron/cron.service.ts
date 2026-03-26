import { Injectable } from '@nestjs/common';
import { PaymentScheduleService } from 'src/payment-schedule/payment-schedule.service';
import { SimulationsService } from 'src/simulations/simulations.service';

@Injectable()
export class CronService {
  constructor(
    private paymentScheduleService: PaymentScheduleService,
    private simulationsService: SimulationsService,
  ) {}

  async processAllPendingPayments(loanId?: BigInt) {
    const payments =
      await this.paymentScheduleService.markPaymentsAsActual(loanId);
    const simulations = await this.simulationsService.getSimulationsByLoanIds(
      payments.map((p) => p.loan_id),
    );

    await Promise.all(
      simulations.map((row) =>
        this.simulationsService.update(
          row.simulation_id,
          {
            name: row.name,
            description: row.description,
            strategy_type: row.strategy_type,
            cascade: row.cascade,
            loan_ids: row.loan_ids,
            extra_payments: row.extra_payments,
          },
          true,
        ),
      ),
    );
  }
}
