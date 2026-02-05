create sequence users_id_seq;


<<<<<<< Updated upstream
CREATE TABLE loans (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  lender TEXT,
  principal DECIMAL(12, 2) NOT NULL,
  current_balance DECIMAL(12, 2) NOT NULL,
  accrued_interest DECIMAL(12, 2) NOT NULL,
  interest_rate DECIMAL(5, 2) NOT NULL,
  minimum_payment DECIMAL(10, 2) NOT NULL,
  term_months INTEGER,
  remaining_months INTEGER,
  start_date TIMESTAMP NOT NULL,
  extra_payment DECIMAL(12, 2)
);
=======
create type strategy_type as enum ('SNOWBALL', 'AVALANCHE', 'CUSTOM', 'EXTRA_PAYMENT', 'TARGETED');
>>>>>>> Stashed changes


create table users
(
	id bigint generated always as identity
		primary key,
	clerk_id varchar(255) not null
		unique,
	first_name varchar(255),
	last_name varchar(255)
);


create table loans
(
	id bigint generated always as identity
		primary key,
	user_id bigint not null
		references users
			on delete cascade,
	name text not null,
	lender text,
	starting_principal numeric(12,2) not null,
	accrued_interest numeric(12,2) not null,
	interest_rate numeric(5,2) not null,
	minimum_payment numeric(10,2) not null,
	extra_payment numeric(12,2),
	current_principal numeric(12,2) not null,
	current_balance numeric(10,2) generated always as ((current_principal + accrued_interest)) stored,
	payment_day_of_month integer
		constraint loans_payment_day_of_month_check
			check ((payment_day_of_month >= 1) AND (payment_day_of_month <= 31)),
	payoff_date date not null,
	start_date date not null
);


create table simulations
(
	id bigint generated always as identity
		primary key,
	user_id bigint not null
		references users
			on delete cascade,
	name text not null,
	description text,
	strategy_type strategy_type not null,
	extra_monthly_amount numeric(10,2),
	extra_monthly_strategy text,
	one_time_payment numeric(10,2),
	one_time_payment_date date,
	total_paid numeric(12,2),
	total_interest_paid numeric(12,2),
	months_to_payoff integer,
	payoff_date date,
	total_savings numeric(12,2),
	created_at timestamp default now(),
	updated_at timestamp default now()
);


create table simulation_loans
(
	id bigint generated always as identity
		primary key,
	simulation_id bigint not null
		references simulations
			on delete cascade,
	loan_id bigint not null
		references loans
			on delete cascade,
	principal_amount numeric(12,2) not null,
	interest_rate numeric(5,2) not null,
	minimum_payment numeric(10,2) not null,
	payoff_month integer not null,
	total_interest numeric(12,2) not null,
	total_paid numeric(12,2) not null,
	payoff_order integer,
	unique (simulation_id, loan_id)
);


create table payment_schedules
(
	id bigint generated always as identity
		primary key,
	simulation_id bigint not null
		references simulations
			on delete cascade,
	month_number integer not null,
	payment_date timestamp not null,
	total_payment numeric(10,2) not null,
	total_principal numeric(10,2) not null,
	total_interest numeric(10,2) not null,
	remaining_balance numeric(12,2) not null,
	unique (simulation_id, month_number),
	constraint payment_schedules_loan_id_fkey
		foreign key () references loans
			on delete cascade
);


create table payment_schedule_details
(
	id bigint generated always as identity
		primary key,
	payment_schedule_id bigint
		references payment_schedules,
	loan_id bigint
		references loans,
	principal_paid numeric(10,2),
	interest_paid numeric(10,2),
	remaining_balance numeric(12,2)
);


