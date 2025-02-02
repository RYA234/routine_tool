
-- docker-compose exec -it webserver bash
-- sqlite3 src/03_hanbai/ch3-4_master/test.sqlite3  < src/03_hanbai/ch3-4_master/customer/getClass.sql


--取引先コード00001(林商店)の業態(02)、規模(03)を取得したい。
-- SQLとしていかん気がする
SELECT "↓↓↓取引先コード00001(林商店)の業態(02)、規模(03)を取得したい。↓↓↓";
SELECT DISTINCT m_client_belong_classifications.client_code,C.name,A.name,B.name
FROM m_client_belong_classifications
INNER JOIN m_client_classifications as A
INNER JOIN m_client_classifications as B
INNER JOIN m_clients_class as C
WHERE m_client_belong_classifications.client_code = '00001'
    AND A.type_code = '02'
    AND B.type_code = '03'
    AND m_client_belong_classifications.classification_code= A.classification_code
    AND m_client_belong_classifications.classification_code= B.classification_code
    AND C.code =m_client_belong_classifications.client_code;
;



--取引先コード00002（クリエイト）の業種(01)、規模(03)を取得したい
-- 一レコードで取得したい
SELECT "↓↓↓取引先コード00002（クリエイト）の業種(01)、規模(03)を取得したい↓↓↓";
SELECT A.client_code,E.name,B_1.name,C_1.name,D_1.name
FROM m_client_belong_classifications as A
-- 規模
INNER JOIN m_client_belong_classifications as B
ON A.client_code = B.client_code
AND B.type_code = '03'
INNER JOIN m_client_classifications as B_1
ON B.classification_code = B_1.classification_code
AND B.type_code = B_1.type_code
-- 業種
INNER JOIN m_client_belong_classifications as C
ON A.client_code = C.client_code
AND C.type_code = '01'
INNER JOIN m_client_classifications as C_1
ON C.classification_code = C_1.classification_code
AND C.type_code = C_1.type_code
-- 会社形態
INNER JOIN m_client_belong_classifications as D
ON A.client_code = D.client_code
AND D.type_code = '04'
INNER JOIN m_client_classifications as D_1
ON D.classification_code = D_1.classification_code
AND D.type_code = D_1.type_code
--会社名
INNER JOIN m_clients_class as E
ON A.client_code = E.code
WHERE  A.client_code = '00002'
GROUP BY A.client_code
;

