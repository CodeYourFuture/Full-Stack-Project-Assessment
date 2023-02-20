-- Database: fsp_videos

-- DROP DATABASE IF EXISTS fsp_videos;

CREATE DATABASE fsp_videos
    WITH
    OWNER = tekre
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United Kingdom.1252'
    LC_CTYPE = 'English_United Kingdom.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE fsp_videos
    IS 'full-stack project videos';