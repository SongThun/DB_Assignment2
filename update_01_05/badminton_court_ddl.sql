drop database if exists badminton_court_DB;
create database badminton_court_DB;
use badminton_court_DB;

create table staff(
	staff_id char(8) primary key,
    ssn char(12) unique not null,
    name varchar(255),
    email varchar(255),
    address varchar(255),
    dob date,
    job_title varchar(255),
    constraint staff_jobtitle check (job_title in ("Receptionist","Facilities manager", "Coach", "Cleaning staff"))
);

create table staff_phone(
	phone varchar(15),
    staff_id char(8),
    primary key(phone, staff_id),
    foreign key(staff_id) references staff(staff_id) on delete cascade on update cascade
);

create table facilities_manager(
	manager_id char(8) primary key,
    years_of_exp int,
    certification varchar(255),
    salary_month decimal(15,2),
    budget bigint,
    foreign key(manager_id) references staff(staff_id) on delete cascade on update cascade
);

create table receptionist(
	receptionist_id char(8) primary key,
    wage decimal(15,2),
    foreign key(receptionist_id) references staff(staff_id) on delete cascade on update cascade
);

create table cleaning_staff(
	cleaner_id char(8) primary key,
    wage decimal(15,2),
    foreign key(cleaner_id) references staff(staff_id) on delete cascade on update cascade
);

create table coach(
	coach_id char(8) primary key,
    specialization varchar(255),
    certification varchar(255),
    physical_assessment varchar(255),
    salary_month decimal(15,2),
    foreign key(coach_id) references staff(staff_id) on delete cascade on update cascade
);

create table shift(
	shift_date date,
	start_time time,
    end_time time,
    receptionist_id char(8),
    primary key(shift_date, start_time, end_time),
    constraint receptionist_id_shift foreign key(receptionist_id) references receptionist(receptionist_id) on delete set null on update cascade,
    constraint time_shift check ((start_time="7:00:00" and end_time="12:00:00") or 
		(start_time="12:00:00" and end_time="17:00:00") or
        (start_time="17:00:00" and end_time="22:00:00"))
);


create table cleaner_works_on(
	shift_date date,
	start_time time,
    end_time time,
    cleaner_id char(8) not null,
    area int, 	
    primary key(shift_date, start_time, end_time, cleaner_id),
    foreign key(shift_date, start_time, end_time) references shift(shift_date,start_time, end_time) on delete cascade on update cascade,
    foreign key(cleaner_id) references cleaning_staff(cleaner_id) on delete cascade on update cascade,
    check (area >=5 and area <=20)
);

delimiter //
create function total_hours_worked(staff_id char(8))
returns int
reads sql data
begin 
	declare job varchar(255);
    declare hours_worked int;
    set job= (select job_title from staff s where s.staff_id = staff_id);
    if job="Coach" or job="Facilites manager" then 
		set hours_worked= null;
    elseif job="Cleaning staff" then 
		set hours_worked= (select sum(hour(end_time)-hour(start_time)) from cleaner_works_on c where (month(shift_date)=month(curdate()) and c.cleaner_id=staff_id));
    elseif job="Receptionist" then 
		set hours_worked= (select sum(hour(end_time)-hour(start_time)) from shift sh where (month(shift_date)=month(curdate()) and sh.receptionist_id=staff_id));
	else set hours_worked= null;
    end if;
    return hours_worked;
end //

create function staff_salary(staff_id char(8))
returns decimal(15,2)
reads sql data
begin
	declare job varchar(255);
    declare salary decimal(15,2);
    set job=(select job_title from staff s where s.staff_id=staff_id);
    if job="Facilities manager" then 
		set salary= (select salary_month from facilities_manager f where f.manager_id=staff_id);
	elseif job="Coach" then
		set salary=(select salary_month from coach c where c.coach_id=staff_id);
	elseif job="Cleaning staff" then
		set salary=total_hours_worked(staff_id) * (select wage from cleaning_staff cl where cl.cleaner_id=staff_id);
    elseif job="Receptionist" then
		set salary=total_hours_worked(staff_id) * (select wage from receptionist r where r.receptionist_id=staff_id);
	else 
		set salary=null;
	end if;
    return salary;
end//

create procedure salary_view()
reads sql data
begin
	select staff_id, name, staff_salary(staff_id)
    from staff;
end//

delimiter ;

create table manager_receipt(
	receipt_id bigint unsigned primary key auto_increment,
	manager_id char(8),
    receipt_date date,
    foreign key(manager_id) references facilities_manager(manager_id) on delete set null on update cascade
);


create table distributor(
	distributor_name varchar(255) primary key
);

create table distributor_contact(
	distributor_name varchar(255),
    distributor_phone varchar(255),
    distributor_address varchar(255),
    primary key(distributor_name, distributor_phone, distributor_address),
    foreign key(distributor_name) references distributor(distributor_name) on delete cascade on update cascade
);


create table product(
	product_name varchar(255) primary key,
    product_price decimal(15,2),
    product_type varchar(255),
    in_stock int default 0
);


create table manager_order(
    product_name varchar(255),
	receipt_id bigint unsigned auto_increment not null,
    distributor_name varchar(255),
    product_quantity int,
    cost decimal(15,2),
    primary key(receipt_id, product_name),
    foreign key(receipt_id) references manager_receipt(receipt_id) on delete restrict on update restrict,
    foreign key(product_name) references product(product_name) on delete restrict on update cascade,
    foreign key(distributor_name) references distributor(distributor_name) on delete set null on update cascade
);

delimiter //
create function total_spent_month(manager_id char(8))
returns decimal(15,2)
reads sql data
begin
	return (select sum(cost*product_quantity) 
			from manager_order o inner join manager_receipt r on o.receipt_id=r.receipt_id 
            where month(r.receipt_date)=month(curdate()) and r.manager_id=manager_id);
end //
delimiter ;

create table customer(
	phone varchar(10) primary key,
    name varchar(255)
);

create table cus_receipt(
	receipt_id bigint unsigned auto_increment primary key,
    manager_id char(8),
    customer_phone varchar(15),
    method varchar(14),
    receipt_date date default (current_date),
    check (method in ("Online", "At the counter")),
    foreign key(manager_id) references facilities_manager(manager_id) on delete set null on update cascade,
    foreign key(customer_phone) references customer(phone) on delete set null on update cascade
);

create table cus_order(
	receipt_id bigint unsigned auto_increment,
    product_name varchar(255),
    quantity int,
    primary key(receipt_id, product_name),
    foreign key(receipt_id) references cus_receipt(receipt_id) on delete restrict on update restrict,
    foreign key(product_name) references product(product_name) on delete restrict on update cascade
);

delimiter //
create function total_price(receipt_id bigint unsigned)
returns decimal(15,2)
reads sql data
begin
	return (select sum(quantity* 	(select product_price 
									from product p 
                                    where p.product_name= c.product_name))
			from cus_order c 
			where c.receipt_id=receipt_id);

end//
delimiter ;

create table court(
	court_id smallint primary key,
    court_type varchar(255),
    court_price decimal(15,2),
    running_cost decimal(15,2),
    check (court_id>=1 and court_id<=20)
);

create table maintain(
	manager_id char(8),
    court_id smallint,
    primary key(manager_id, court_id),
    foreign key (manager_id) references facilities_manager(manager_id) on delete cascade on update cascade,
    foreign key (court_id) references court(court_id) on delete cascade on update cascade
);

create table info_main(
	manager_id char(8),
    court_id smallint,
    maintenance varchar(255),
    maintain_date date default (current_date),
    cost decimal(15,2),
    primary key(manager_id, court_id, maintenance, maintain_date),
    foreign key (manager_id, court_id) references maintain(manager_id, court_id) on delete cascade on update cascade
);

create table court_rental(
	court_id smallint,
    court_date date default (current_date),
    start_time time,
    end_time time,
    cus_phone varchar(15),
    booking_method varchar(14),
    receptionist_id char(8),
    primary key(court_id, court_date, start_time),
    check (booking_method in ("Online", "At the counter")),
    constraint court_reference foreign key(court_id) references court(court_id) on delete cascade on update cascade,
    constraint rct_reference foreign key(receptionist_id) references receptionist(receptionist_id) on delete set null on update cascade,
    constraint cus_reference foreign key(cus_phone) references customer(phone) on delete set null on update cascade
);

create table membership(
	phone varchar(15) primary key,
    total_hours_package smallint,
    price decimal(15,2),
    email varchar(255),
    registered_date date default (current_date),
    foreign key(phone) references customer(phone) on delete cascade on update cascade
);

delimiter //

create function expired_date(phone varchar(15))
returns date
reads sql data
begin 
	declare r_date date;
    declare free_hours int;
    set r_date = (select registered_date from membership m where m.phone=phone);
    set free_hours = (select total_hours_package from membership m where m.phone=phone);
    if free_hours = 40 then
		return adddate(r_date, interval 3 month);
    else
		return adddate(r_date, interval 12 month);
	end if;
end//

create function remaining_free_hours(phone varchar(15), rental_date date)
returns int
reads sql data
begin
	declare hours_used int;
	declare total_hours int;
    DECLARE remaining_hours INT;
    if (phone not in (select phone from membership)) then return null;
    end if;
    if (expired_date(phone)<=rental_date) then return null;
    end if;
    set total_hours= (select total_hours_package from membership m where m.phone=phone);
    set hours_used = (select sum(hour(end_time)-hour(start_time)) from court_rental cr where cr.court_date < rental_date and cr.cus_phone = phone);
    set remaining_hours =  total_hours-if(hours_used is not null, hours_used, 0);
    return remaining_hours;
end//

create function total_rental_price(court_id smallint, court_date date, start_time time, end_time time, phone varchar(15))
returns decimal(15,2)
reads sql data
begin
	declare price decimal(15,2);
    declare mem bool;
    declare remaining_hours int;
    declare total_hours int;
    set remaining_hours = remaining_free_hours(phone, court_date);
    set total_hours = hour(end_time) - hour(start_time);
    set mem = (remaining_hours > 0);
    set price = (select court_price from court c where c.court_id=court_id);
    
    if mem=true then
		return 0 + if((total_hours - remaining_hours > 0), price * (total_hours - remaining_hours), 0);
	end if;
    return price * (hour(end_time) - hour(start_time));
end //

delimiter ;

create table sessions(
	session_date date default (current_date),
    start_time time,
    end_time time,
    primary key(session_date, start_time, end_time)
);

create table training_program(
	program_name varchar(255),
    start_date date,
    end_date date,
    time_table varchar(255),
    availability varchar(255),
    admission_fee decimal(15,2),
    maximum_admission smallint,
    coach_id char(8),
    primary key(program_name, start_date, end_date),
    foreign key(coach_id) references coach(coach_id) on delete set null on update cascade
);

create table participate (
	phone varchar(15),
    program_name varchar(255),
    start_date date,
    end_date date,
    method varchar(255),
    primary key(phone, program_name, start_date, end_date),
    foreign key(phone) references customer(phone) on delete cascade on update cascade,
    foreign key(program_name, start_date, end_date) references training_program(program_name, start_date, end_date) on delete cascade on update cascade
);

delimiter //
create function num_admission(program_name varchar(255), start_date date, end_date date)
returns int
reads sql data
begin
	return (
		select count(*) 
        from participate p 
        where (p.program_name=program_name and p.start_date=start_date and p.end_date=end_date)
	);
end //

delimiter ;

create table take (
	court_id smallint,
    session_date date,
    start_time time,
    end_time time,
    program_name varchar(255) not null,
    start_date date not null,
    end_date date not null,
    primary key(court_id, session_date, start_time, end_time),
    foreign key(court_id) references court(court_id) on delete cascade on update cascade,
    foreign key(session_date, start_time, end_time) references sessions(session_date, start_time, end_time) on delete cascade on update cascade,
    foreign key(program_name, start_date, end_date) references training_program(program_name, start_date, end_date) on delete cascade on update cascade
);

delimiter //
create trigger on_insert_manager_order before insert on manager_order 
for each row
begin
	update product p 
    set in_stock = in_stock + new.product_quantity 
    where new.product_name=p.product_name;
end//

create trigger on_insert_cus_order before insert on cus_order
for each row
begin
	declare i_s int;
    set i_s= (select in_stock from product p where p.product_name=new.product_name);
    if (i_s < new.quantity) then 
		signal sqlstate '45000' set MESSAGE_TEXT = "in_stock < quantity";
	else 
		update product p
        set in_stock= in_stock - new.quantity
        where new.product_name=p.product_name;
	end if;
    
end//


create procedure court_availability(court_date date, start_time time, end_time time)
reads sql data
begin
	select court_id, court_type, court_price
    from court
    where court_id not in(	select court_id
							from court_rental c 
							where c.court_date=court_date and 
									((c.start_time > start_time and c.start_time < end_time) or 
									(c.end_time >start_time and c.end_time <end_time) or
									(c.start_time <= start_time and c.end_time >= end_time)))
		and court_id not in(	select court_id
								from take t
                                where court_date=session_date and
									((t.start_time > start_time and t.start_time < end_time) or 
									(t.end_time >start_time and t.end_time <end_time) or
									(t.start_time <= start_time and t.end_time >= end_time)));
end//
delimiter ;

delimiter \\
create procedure frequency()
reads sql data
begin
	SELECT court_id, rental_count AS Total_time_rental
	FROM
	(
		SELECT court_id, COUNT(court_id) AS rental_count, DENSE_RANK() OVER (ORDER BY COUNT(court_id) DESC) AS rnk
		FROM court_rental
		GROUP BY court_id
	) t
	WHERE rnk <= 3;
end;
\\

CREATE PROCEDURE GetCurrentShiftDetails()
BEGIN
    DECLARE currentShiftDate DATE;
    DECLARE currentShiftTime TIME;

    -- Get current date and time
    SET currentShiftDate = CURDATE();
    SET currentShiftTime = CURTIME();

    -- Return shift details
    SELECT s.shift_date, s.start_time, s.end_time, s.receptionist_id, c.cleaner_id, c.area
    FROM shift s
    LEFT JOIN cleaner_works_on c ON s.shift_date = c.shift_date 
                                   AND s.start_time = c.start_time 
                                   AND s.end_time = c.end_time
    WHERE s.shift_date = currentShiftDate
      AND currentShiftTime BETWEEN s.start_time AND s.end_time;
END \\

CREATE PROCEDURE CalculateMembershipPercentage()
BEGIN
    DECLARE total_customers INT;
    DECLARE registered_customers INT;
    DECLARE membership_percentage DECIMAL(5,2);
    
    -- Get total number of customers
    SELECT COUNT(*) INTO total_customers FROM customer;
    
    -- Get number of customers who registered for membership
    SELECT COUNT(*) INTO registered_customers FROM membership;
    
    -- Calculate membership percentage
    IF total_customers > 0 THEN
        SET membership_percentage = (registered_customers / total_customers) * 100;
    ELSE
        SET membership_percentage = 0;
    END IF;
    
    -- Display the result
    SELECT CONCAT(ROUND(membership_percentage, 2), '%') AS Membership_Percentage, registered_customers as Registered, total_customers as Total;
END \\

create procedure All_Membership()
begin
	select c.name, m.phone, m.email, m.registered_date, m.total_hours_package, m.price 
    from customer c join membership m where c.phone=m.phone
    order by m.registered_date desc;
end \\

create procedure MonthlyCourtRevenue()
begin
	select
		sum(total_rental_price(court_id, court_date, start_time, end_time, cus_phone)) as total_revenue
	from court_rental
    where month(court_date) = month(current_date()) - 1;
end \\

create procedure MonthlyProductRevenue()
begin
	select sum(total_price(receipt_id)) as total_revenue
    from cus_receipt
    where month(receipt_date) = month(current_date()) - 1;
end \\
delimiter ; 
