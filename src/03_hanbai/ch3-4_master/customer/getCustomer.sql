-- 1. 顧客情報を取得する。
-- docker-compose exec -it webserver bash
-- sqlite3 src/03_hanbai/ch3-4_master/test.sqlite3  < src/03_hanbai/ch3-4_master/customer/getCustomer.sql

SELECT m_customers.code,m_clients.name,m_customers.customer_person_name
    FROM m_customers
    JOIN m_clients
    ON m_customers.code = m_clients.code
    WHERE m_customers.code = 'C0002'
;

-- 結果
-- C0002|〇〇自動車株式会社|顧客次郎