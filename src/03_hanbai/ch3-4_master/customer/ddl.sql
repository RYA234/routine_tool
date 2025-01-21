drop table if exists  m_product_classification;
-- 1. 取引先（顧客　仕入先）マスタ
-- docker-compose exec -it webserver bash
-- sqlite3 src/03_hanbai/ch3-4_master/test.sqlite3  < src/03_hanbai/ch3-4_master/customer/ddl.sql
-- sqlite3 src/03_hanbai/ch3-4_master/test.sqlite3 "select * from m_clients;"


-- 取引先マスタ
drop table if exists  m_clients;
create table m_clients(
    code char(5) not null,
    name varchar(50) not null,
    kana varchar(50),
    customer_classification char(1) not null,
    vendor_classification char(1) not null,
    postal_code char(7),
    address1 varchar(100),
    address2 varchar(100),
    client_division varchar(50),
    forbidden char(1),
    miscellaneous_classification char(1),
    updated_at timestamp default current_timestamp,
    updated_by varchar(50)
);


-- 顧客マスタ
drop table if exists  m_customers;
create table m_customers(
    code char(5) not null,
    billing_code char(5),
    own_person_code char(5),
    customer_person_name char(20),
    tel char(13),
    fax char(13),
    mail_address varchar(100),
    closing_date_1 char(2),
    payment_month_1 char(2),
    payment_day_1 char(2),
    payment_method_1 char(1),
    closing_date_2 char(2),
    payment_month_2 char(2),
    payment_day_2 char(2),
    payment_method_2 char(1),
    credit_amount integer,
    updated_at timestamp default current_timestamp,
    updated_by varchar(50)
);


-- 仕入先マスタ
drop table if exists  m_vendors;
create table m_vendors(
    code char(5) not null,
    vendor_person_name char(20),
    tel char(13),
    fax char(13),
    mail_address varchar(100),
    updated_at timestamp default current_timestamp,
    updated_by varchar(50)
);

insert into m_clients (code, name, kana, customer_classification, vendor_classification, postal_code, address1, address2, client_division, forbidden, miscellaneous_classification, updated_at, updated_by) values
('V0001', '〇〇電子株式会社', 'マルマルデンシカブシキガイシャ', '1', '0', '1234567', 'Address 1-1', 'Address 1-2', 'Division A', '0', '0', current_timestamp, 'user1'),
('C0002', '〇〇自動車株式会社', 'マルマルデンシカブシキガイシャ', '1', '0', '2345678', 'Address 2-1', 'Address 2-2', 'Division B', '0', '0', current_timestamp, 'user2');

insert into m_customers (code, billing_code, own_person_code, customer_person_name, tel, fax, mail_address, closing_date_1, payment_month_1, payment_day_1, payment_method_1, closing_date_2, payment_month_2, payment_day_2, payment_method_2, credit_amount, updated_at, updated_by) values
('C0002', 'B0002', 'P0002', '顧客次郎', '09876543210', '09876543211', 'customerB@example.com', '05', '03', '10', '2', '20', '04', '25', '1', 200000, current_timestamp, 'user2');

insert into m_vendors (code, vendor_person_name, tel, fax, mail_address, updated_at, updated_by) values
('V0001', '仕入太郎', '01234567890', '01234567891', 'vendorA@example.com', current_timestamp, 'user1');