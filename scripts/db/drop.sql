---------------------------------------------------------------
-- DROP ALL TABLES, SEQUENCES

create or replace procedure DROP_ALL_TABLES_SEQUENCES
is
begin
  -- Drop sequences
  FOR i IN (SELECT useq.sequence_name FROM USER_SEQUENCES useq) LOOP
    EXECUTE IMMEDIATE 'drop sequence ' || i.sequence_name || '';
  END LOOP;

  --Drop tables
  FOR i IN (SELECT utb.table_name FROM USER_TABLES utb) LOOP
    EXECUTE IMMEDIATE 'drop table ' || i.table_name ||' CASCADE CONSTRAINTS ';
  END LOOP;
end;
/

begin 
  DROP_ALL_TABLES_SEQUENCES;
end;
/
