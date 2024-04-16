INSERT INTO sManager VALUES ('thunthun', '123456');

INSERT INTO staff (staff_id, ssn, name, email, address, dob, job_title) 
VALUES 
('RCT00001', '123456789012', 'Ninh Đức Tuấn', 'tuan.minh@gmail.com', '201A Phan Van Khoe St., Ward 5, Dist. 6, HCMC', '1990-05-15', "Receptionist"),
('MNG00001', '234567890123', 'Đinh Tấn Trương', 'truong.dinh@gmail.com', '11A Pho Cho St., Tan Thanh Ward, Tan Phu Dist., HCMC ', '1985-08-20', "Facilities manager"),
('COA00001', '345678901234', 'Lâm Đình Thiên', 'thien.lam@gmail.com', '139 Uu Long St., Ward 11, Dist. 8, HCMC', '1988-12-10', "Coach"),
('CLN00001', '456789012345', 'Giang Kỳ Duyên', 'duyen.giang@gmail.com', '72 Pham Van Hai St., Ward 2, Tan Binh Dist., HCMC', '1995-04-25', "Cleaning staff"),
('RCT00002', '120498547688', 'Lê Thị Thanh Hà', 'ha.le@gmail.com', '9A Thoai Ngoc Hau St., Thanh Hoa Ward, Tan Phu Dist., HCMC', '1993-12-14', "Receptionist");

INSERT INTO staff_phone (phone, staff_id)
VALUES 
('0578193243', 'RCT00001'),
('0932701326', 'MNG00001'),
('0453035360', 'COA00001'),
('0889021719', 'CLN00001');

INSERT INTO facilities_manager (manager_id, years_of_exp, certification, salary_month, budget)
VALUES 
('MNG00001', 7, 'Facility Management Certification',24000000 , 200000000);

INSERT INTO receptionist (receptionist_id, wage)
VALUES 
('RCT00001', 60000.00),
('RCT00002', 60000.00);

INSERT INTO cleaning_staff (cleaner_id, wage)
VALUES 
('CLN00001', 40000.00);

INSERT INTO coach (coach_id, specialization, certification, physical_assessment, salary_month)
VALUES 
('COA00001', 'Singles', 'NCCP', 'Healthy', 10000000.00);

INSERT INTO shift (shift_date, start_time, end_time, receptionist_id)
VALUES 
('2024-04-16', '12:00:00', '17:00:00', 'RCT00002'),
('2024-04-20', '7:00:00', '12:00:00', 'RCT00001');

INSERT INTO cleaner_works_on (shift_date, start_time, end_time, cleaner_id, area)
VALUES 
('2024-04-20', '7:00:00', '12:00:00', 'CLN00001', 3);

INSERT INTO manager_receipt (manager_id, receipt_date)
VALUES 
('MNG00001', '2024-04-09'),
('MNG00001', '2024-04-08');
;

INSERT INTO distributor (distributor_name)
VALUES 
('Li-Ning'),
('Yonex');
;

INSERT INTO distributor_contact (distributor_name, distributor_phone, distributor_address)
VALUES 
('Li-Ning', '0338941512', '11 Su Van Hanh St., Ward 12, Dist. 10, HCMC'),
('Li-Ning', '0363880715', '30 Bo Bao Tan Thang, Son Ky Ward, Tan Phu Dist., HCMC'),
('Yonex', '0888554268', '364 Lac Long Quan, Ward 5, Dist. 11, HCMC'),
('Yonex', '0931823614', '20 Cao Bá Nhạ St., Nguyen Cu Trinh Ward, Dist. 1, HCMC');
;

INSERT INTO product (product_name, product_price, product_type, in_stock)
VALUES 
('Grips', 10000.00, 'Accessory', 200),
('Overgrips', 10000.00, 'Accessory', 200),
('Wristbands', 50000.00, 'Accessory', 50),
('Headbands', 50000.00, 'Accessory', 50),
('Revive', 20000.00, 'Food & Drink', 60),
('Mineral water', 10000.00, 'Food & Drink', 100),
('Iced tea (small)', 10000.00, 'Food & Drink', 60),
('Iced tea (big)', 20000.00, 'Food & Drink', 60),
('Electrolyte water', 20000.00, 'Food & Drink', 100),
('Energy bar', 25000.00, 'Food & Drink', 50),
('Protein bar', 25000.00, 'Food & Drink', 50);
;

INSERT INTO manager_order (product_name, distributor_name, product_quantity, cost)
VALUES 
('Grips', 'Li-Ning', 100, 10000.00),
('Overgrips', 'Yonex', 100, 10000.00);
;

INSERT INTO customer (phone, name)
VALUES 
('0979406038', 'Lê Chí Thắng'),
('0783683996', 'Đỗ Thị Thảo Quỳnh');
;

INSERT INTO cus_receipt (manager_id, customer_phone, method)
VALUES 
('MNG00001', '0979406038', 'Online'),
('MNG00001', '0783683996', 'At the counter');
;

INSERT INTO cus_order (product_name, quantity)
VALUES 
('Overgrips', 3),
('Iced tea (small)', 2);
;

INSERT INTO court (court_id, court_type, court_price, running_cost)
VALUES 
(1, 'Synthetic court flooring', 100000.00, 5000000.00),
(2, 'Synthetic court flooring', 100000.00, 5000000.00),
(3, 'Synthetic court flooring', 100000.00, 5000000.00),
(4, 'Synthetic court flooring', 100000.00, 5000000.00),
(5, 'Synthetic court flooring', 100000.00, 5000000.00),
(6, 'Synthetic court flooring', 100000.00, 5000000.00),
(7, 'Synthetic court flooring', 100000.00, 5000000.00),
(8, 'Synthetic court flooring', 100000.00, 5000000.00),
(9, 'Synthetic court flooring', 100000.00, 5000000.00),
(10, 'Synthetic court flooring', 100000.00, 5000000.00),
(11, 'Rubber flooring', 140000.00, 4000000.00),
(12, 'Rubber flooring', 140000.00, 4000000.00),
(13, 'Rubber flooring', 140000.00, 4000000.00),
(14, 'Rubber flooring', 140000.00, 4000000.00),
(15, 'Rubber flooring', 140000.00, 4000000.00),
(16, 'Rubber flooring', 140000.00, 4000000.00),
(17, 'Rubber flooring', 140000.00, 4000000.00),
(18, 'Rubber flooring', 140000.00, 4000000.00),
(19, 'Rubber flooring', 140000.00, 4000000.00),
(20, 'Rubber flooring', 140000.00, 4000000.00);
;

INSERT INTO maintain (manager_id, court_id)
VALUES 
('MNG00001', 1),
('MNG00001', 2),
('MNG00001', 3),
('MNG00001', 4),
('MNG00001', 5),
('MNG00001', 6),
('MNG00001', 7),
('MNG00001', 8),
('MNG00001', 9),
('MNG00001', 10);
;

INSERT INTO info_main (manager_id, court_id, maintenance, maintain_date, cost)
VALUES 
('MNG00001', 2, 'Ensuring proper traction', '2024-04-20', 6000000.00),
('MNG00001', 8, 'Repair surface damage', '2024-04-20', 10000000.00);
;

INSERT INTO court_rental (court_id, court_date, start_time, end_time, cus_phone, booking_method, receptionist_id)
VALUES 
(1, '2024-04-16', '9:00:00', '12:00:00', '0979406038', 'Online', 'RCT00001'),
(12, '2024-04-20', '14:00:00', '16:00:00', '0783683996', 'At the counter', 'RCT00002');
;

INSERT INTO membership (phone, total_hours_package, price, email, registered_date)
VALUES
('0783683996', 12, 500000.00, 'quynh.do@gmail.com', '2024-04-01');
;

INSERT INTO sessions (session_date, start_time, end_time)
VALUES
('2024-04-10', '7:00:00', '9:00:00'),
('2024-04-14', '7:00:00', '9:00:00'),
('2024-04-17', '7:00:00', '9:00:00'),
('2024-04-21', '7:00:00', '9:00:00'),
('2024-04-24', '7:00:00', '9:00:00'),
('2024-04-28', '7:00:00', '9:00:00'),
('2024-05-01', '7:00:00', '9:00:00'),
('2024-05-05', '7:00:00', '9:00:00'),
('2024-05-08', '7:00:00', '9:00:00'),
('2024-05-12', '7:00:00', '9:00:00'),
('2024-04-15', '16:00:00', '18:00:00'),
('2024-04-19', '16:00:00', '18:00:00'),
('2024-04-22', '16:00:00', '18:00:00'),
('2024-04-26', '16:00:00', '18:00:00'),
('2024-04-29', '16:00:00', '18:00:00'),
('2024-05-03', '16:00:00', '18:00:00'),
('2024-05-06', '16:00:00', '18:00:00'),
('2024-05-10', '16:00:00', '18:00:00'),
('2024-05-13', '16:00:00', '18:00:00'),
('2024-05-17', '16:00:00', '18:00:00');
;

INSERT INTO training_program (program_name, start_date, end_date, time_table, availability, admission_fee, maximum_admission, coach_id)
VALUES 
('Beginner', '2024-04-10', '2024-05-12', 'Wed-Sun 7-9pm', 'Available', 1000000.00, 8, 'COA00001'),
('Advanced', '2024-04-15', '2024-05-17', 'Mon-Fri 4-6pm', 'Available', 2000000.00, 4, 'COA00001');
;


INSERT INTO participate (phone, program_name, start_date, end_date, method)
VALUES 
('0979406038', 'Beginner', '2024-04-10', '2024-05-12', 'Online'),
('0783683996', 'Advanced', '2024-04-15', '2024-05-17', 'At the counter');
;

INSERT INTO take (court_id, session_date, start_time, end_time, program_name, start_date, end_date)
VALUES 
(19, '2024-04-10', '7:00:00', '9:00:00', 'Beginner', '2024-04-10', '2024-05-12'),
(20, '2024-04-15', '16:00:00', '18:00:00', 'Advanced', '2024-04-15', '2024-05-17');
;