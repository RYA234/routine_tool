drop table if exists  m_product_classification;
-- 1. 商品分類マスタ
-- 商品分類マスタは、商品の分類を管理するマスタです。
-- docker-compose exec -it webserver bash
-- sqlite3 03_hanbai/ch3-4_master/test.sqlite3  < 03_hanbai/ch3-4_master/product/m_products.sql
-- sqlite3 03_hanbai/ch3-4_master/test.sqlite3 "select * from m_products;"

create table  m_product_classification(
    code char(6) PRIMARY KEY,
    name varchar(50),
    layer int not null,
    superior_code char(6)
);


insert into m_product_classification values
('010000','生鮮食品',2,null),
('010100','食肉',1,'010000'),
('010101','牛肉',0,'010100'),
('010102','豚肉',0,'010100'),
('010200','水産物',1,'010000'),
('010201','まぐろ',0,'010200'),
('010202','えび',0,'010200')
;

drop table if exists m_products;

create table m_products(
    code char(5) PRIMARY KEY,
    official_name varchar(50),
    kana varchar(50),
    serial_number varchar(20),
    purchase_price int,
    sale_price int,
    tax_classification char(1),
    classification_code char(9) not null,
    updated_at timestamp not null,
    updated_by varchar(10) not null,
    remark varchar(100)
);

insert into m_products values
-- 販売単価と仕入単価
('00001','牛ひれ','ギュウヒレ','1129',1000,1500,'1','010101','2020-01-01 00:00:00','SYSTEM',""),
('00002','牛ロース','ギュウロース','1130',800,1200,'1','010101','2020-01-01 00:00:00','SYSTEM',""),
('00003','まぐろトロ','マグロトロ','1131',800,1200,'1','010201','2020-01-01 00:00:00','SYSTEM',""),
('00004','まぐろ赤身','マグロアカミ','1131',800,1200,'1','010201','2020-01-01 00:00:00','SYSTEM',""),
('00005','まぐろ刺身','マグロサシミ','1131',800,1200,'1','010201','2020-01-01 00:00:00','SYSTEM',""),
('00006','桜えび','サクラエビ','1131',800,1200,'1','010202','2020-01-01 00:00:00','SYSTEM',""),
('00007','ブラックタイガー','ブラックタイガー','1131',800,1200,'1','010202','2020-01-01 00:00:00','SYSTEM',""),
('00008','大正えび','タイショウエビ','1131',800,1200,'1','010202','2020-01-01 00:00:00','SYSTEM',"")
;

drop table if exists sales_price_by_customer;

create table sales_price_by_customer(
    product_code char(3) not null,
    customer_code char(5) not null,
    sale_price int not null,
    primary key(product_code,customer_code)
);

insert into sales_price_by_customer values
('00001','00001',1700),
('00001','00002',1000),
('00001','00003',900);