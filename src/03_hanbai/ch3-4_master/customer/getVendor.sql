-- 1. 仕入先情報を取得する。
-- docker-compose exec -it webserver bash
-- sqlite3 src/03_hanbai/ch3-4_master/test.sqlite3  < src/03_hanbai/ch3-4_master/customer/getVendor.sql

SELECT m_vendors.code,m_clients.name,m_vendors.vendor_person_name
    FROM m_vendors
    JOIN m_clients
    ON m_vendors.code = m_clients.code
    WHERE m_vendors.code = 'V0001'
;


-- 結果
-- V0001|〇〇電子株式会社|仕入太郎