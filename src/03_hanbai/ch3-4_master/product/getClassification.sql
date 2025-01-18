-- 商品マスタ　商品分類
-- 実行コマンド
-- docker-compose exec -it webserver bash
-- sqlite3 03_hanbai/ch3-4_master/test.sqlite3 < 03_hanbai/ch3-4_master/product/getClassification.sql

DROP TABLE IF EXISTS logs;
CREATE TABLE logs(
    code varchar(2) PRIMARY KEY,
    message varchar(50)
);

insert into logs values
('1', '↓↓階層１「水産物」に分類される商品を取得する。↓↓'),
('2', '↓↓階層０「まぐろ」に分類される商品を取得する。↓↓'),
('3', '↓↓商品名まぐろトロ(00007)の階層0,1,2の商品分類を取得する。↓↓'),
('4', '↓↓階層０「まぐろ」の上位分類を取得する。（階層１と２）↓↓')
;

SELECT message FROM logs WHERE code = '1';

SELECT L1_class.name,L0_class.name,m_products.official_name
FROM m_products,m_product_classification as L0_class,m_product_classification as L1_class
WHERE m_products.classification_code = L0_class.code
AND L0_class.superior_code = L1_class.code
AND L1_class.name = '水産物'
;


SELECT message FROM logs WHERE code = '2';

SELECT  m_product_classification.name,m_products.official_name,m_products.kana
FROM m_products
JOIN m_product_classification
ON m_product_classification.code = m_products.classification_code
AND m_product_classification.name = 'まぐろ'
;


SELECT message FROM logs WHERE code = '3';
-- パフォーマンスは良くないはず
SELECT L2_class.name,L1_class.name,L0_class.name,m_products.official_name
FROM m_products,m_product_classification as L0_class,m_product_classification as L1_class,m_product_classification as L2_class
WHERE m_products.official_name = 'まぐろトロ'
AND m_products.classification_code = L0_class.code
AND L0_class.superior_code = L1_class.code
AND L1_class.superior_code = L2_class.code
;



SELECT message FROM logs WHERE code = '4';

SELECT parent.name,child.name,grandchild.name
FROM m_product_classification AS parent,m_product_classification as child, m_product_classification as grandchild
where grandchild.name = 'まぐろ'
and child.code = grandchild.superior_code
and parent.code = child.superior_code
;

DROP TABLE IF EXISTS logs;