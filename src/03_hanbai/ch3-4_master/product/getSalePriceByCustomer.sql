-- docker-compose exec -it webserver bash
-- sqlite3 03_hanbai/ch3-4_master/test.sqlite3 < 03_hanbai/ch3-4_master/product/getSalePriceByCustomer.sql
select  a.code,
        CASE b.customer_code
            WHEN '00001' THEN '初見'
            WHEN '00002' THEN '常連'
            WHEN '00003' THEN 'グループ会社'
        END,
        b.sale_price
from m_products as A,sales_price_by_customer as B
where A.official_name = '牛ひれ'
and A.code = B.product_code
;