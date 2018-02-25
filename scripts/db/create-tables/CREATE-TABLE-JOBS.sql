---------------------------------------------------------------
-- CREATE TABLE JOBS

CREATE TABLE JOBS 
(
  JOB_ID NUMBER(4,0) NOT NULL 
, JOB_TITLE NVARCHAR2(50) NOT NULL 
, MIN_SALARY NUMBER(8,2) 
, MAX_SALARY NUMBER(8,2)
, CREATED_AT TIMESTAMP default systimestamp
, UPDATED_AT TIMESTAMP default systimestamp 
, CONSTRAINT JOBS_PK PRIMARY KEY 
  (
    JOB_ID 
  )
  ENABLE 
);

