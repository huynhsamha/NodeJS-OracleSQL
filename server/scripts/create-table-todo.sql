CREATE TABLE Todo (
  id  number(10, 0) not null primary key,
  title varchar2(50 char) not null,
  content varchar2(1000 char),
  date_start  date,
  date_end  date,
  created_at timestamp default systimestamp,
  updated_at timestamp default systimestamp
)
