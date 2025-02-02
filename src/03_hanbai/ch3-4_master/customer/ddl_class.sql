-- 1. 取引先（顧客　仕入先）マスタ
-- docker-compose exec -it webserver bash
-- sqlite3 src/03_hanbai/ch3-4_master/test.sqlite3  < src/03_hanbai/ch3-4_master/customer/ddl_class.sql
-- sqlite3 src/03_hanbai/ch3-4_master/test.sqlite3 "select * from m_client_classification_types;"


--取引先分類種別コード
--
drop table if exists  m_client_classification_types;
create table m_client_classification_types(
    classification_code char(2) PRIMARY KEY,
    name varchar(50),
    updated_at timestamp default current_timestamp,
    updated_by varchar(50)
);

insert into m_client_classification_types values
('01','業種','','admin'),
('02','業態','','admin'),
('03','規模','','admin'),
('04','会社形態','','admin'),
('05','上場','','admin')
;

-- 取引先分類マスタ
drop table if exists m_client_classifications;
create table m_client_classifications(
    classification_code char(3) not null,
    type_code char(2)  not null,
    name varchar(50),
    updated_at timestamp default current_timestamp,
    updated_by varchar(50),
    primary key(classification_code,type_code)
);

insert into m_client_classifications values
('001','01','製造業','','admin'),
('002','01','商社','','admin'),
('003','01','卸売業','','admin'),
('004','01','小売業','','admin'),
('005','01','サービス業','','admin'),
('006','01','金融業','','admin'),
('007','01','不動産業','','admin'),
('008','01','その他','','admin'),
('001','02','個人商店','','admin'),
('002','02','スーパーマーケット','','admin'),
('003','02','コンビニ','','admin'),
('004','02','ディスカウントストア','','admin'),
('005','02','ドラッグストア','','admin'),
('006','02','自社製品','','admin'),
('007','02','SES','','admin'),
('008','02','受託開発','','admin'),
('001','03','１００人未満','','admin'),
('002','03','１００人以上５００人未満','','admin'),
('003','03','５００人以上','','admin'),
('001','04','株式会社','','admin'),
('002','04','合同会社','','admin'),
('003','04','合資会社','','admin'),
('004','04','合名会社','','admin'),
('001','05','プライム市場','','admin'),
('002','05','スタンダード市場','','admin'),
('003','05','グロース市場','','admin'),
('004','05','TOKYO PROマーケット','','admin'),
('005','05','上場してない','','admin')
;





-- 取引先分類所属マスタ
drop table if exists m_client_belong_classifications;
create table m_client_belong_classifications(
    type_code char(2)  not null,
    classification_code char(3) not null,
    client_code char(5) not null,
    updated_at timestamp default current_timestamp,
    updated_by varchar(50),
    primary key(classification_code,type_code,client_code)
);


insert into m_client_belong_classifications values
-- 林商店の情報について
('01','004','00001','','admin'),
('02','001','00001','','admin'),
('03','001','00001','','admin'),
('04','004','00001','','admin'),
('05','005','00001','','admin'),
--クリエイトの情報について
('01','004','00002','','admin'),
('02','005','00002','','admin'),
('03','003','00002','','admin'),
('04','001','00002','','admin'),
('05','001','00002','','admin');




drop table if exists  m_clients_class;
create table m_clients_class(
    code char(5) not null,
    name varchar(50) not null,
    kana varchar(50)
);

insert into m_clients_class values
('00001','林商店','ハヤシショウテン'),
('00002','クリエイト','クリエイト'),
('00003','地元密着スーパー','ジモトミッチャクスーパー')
;


