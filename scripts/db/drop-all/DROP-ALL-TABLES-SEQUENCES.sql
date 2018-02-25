---------------------------------------------------------------
-- DROP ALL TABLES AND SEQUENCES

BEGIN

FOR i IN (SELECT us.sequence_name FROM USER_SEQUENCES us) LOOP
    EXECUTE IMMEDIATE 'drop sequence '|| i.sequence_name ||'';
END LOOP;

FOR i IN (SELECT ut.table_name FROM USER_TABLES ut) LOOP
    EXECUTE IMMEDIATE 'drop table '|| i.table_name ||' CASCADE CONSTRAINTS ';
END LOOP;

END;

