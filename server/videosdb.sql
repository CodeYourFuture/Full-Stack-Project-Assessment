--
-- PostgreSQL database dump
--

-- Dumped from database version 15.5
-- Dumped by pg_dump version 15.5 (Ubuntu 15.5-1.pgdg22.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: full_stack_database_aeds_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO full_stack_database_aeds_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: videos; Type: TABLE; Schema: public; Owner: full_stack_database_aeds_user
--

CREATE TABLE public.videos (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    rating integer
);


ALTER TABLE public.videos OWNER TO full_stack_database_aeds_user;

--
-- Name: videos_id_seq; Type: SEQUENCE; Schema: public; Owner: full_stack_database_aeds_user
--

CREATE SEQUENCE public.videos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.videos_id_seq OWNER TO full_stack_database_aeds_user;

--
-- Name: videos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: full_stack_database_aeds_user
--

ALTER SEQUENCE public.videos_id_seq OWNED BY public.videos.id;


--
-- Name: videos id; Type: DEFAULT; Schema: public; Owner: full_stack_database_aeds_user
--

ALTER TABLE ONLY public.videos ALTER COLUMN id SET DEFAULT nextval('public.videos_id_seq'::regclass);


--
-- Data for Name: videos; Type: TABLE DATA; Schema: public; Owner: full_stack_database_aeds_user
--

COPY public.videos (id, title, url, rating) FROM stdin;
523523	Never Gonna Give You Up	https://www.youtube.com/watch?v=dQw4w9WgXcQ	23
523427	The Coding Train	https://www.youtube.com/watch?v=HerCR8bw_GE	230
82653	Mac & Cheese | Basics with Babish	https://www.youtube.com/watch?v=FUeyrEN14Rk	2111
858566	Videos for Cats to Watch - 8 Hour Bird Bonanza	https://www.youtube.com/watch?v=xbs7FT7dXYc	11
453538	The Complete London 2012 Opening Ceremony | London 2012 Olympic Games	https://www.youtube.com/watch?v=4As0e4de-rI	3211
283634	Learn Unity - Beginner's Game Development Course	https://www.youtube.com/watch?v=gB1F9G0JXOo	211
562824	Cracking Enigma in 2021 - Computerphile	https://www.youtube.com/watch?v=RzWB5jL5RX0	111
442452	Coding Adventure: Chess AI	https://www.youtube.com/watch?v=U4ogK0MIzqk	671
536363	Coding Adventure: Ant and Slime Simulations	https://www.youtube.com/watch?v=X-iSQQgOd1A	76
323445	Why the Tour de France is so brutal	https://www.youtube.com/watch?v=ZacOS8NBK6U	73
1	Talking	https://www.youtube.com/watch?v=a15vr10FFvg	0
\.


--
-- Name: videos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: full_stack_database_aeds_user
--

SELECT pg_catalog.setval('public.videos_id_seq', 1, true);


--
-- Name: videos videos_pkey; Type: CONSTRAINT; Schema: public; Owner: full_stack_database_aeds_user
--

ALTER TABLE ONLY public.videos
    ADD CONSTRAINT videos_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES  TO full_stack_database_aeds_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES  TO full_stack_database_aeds_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS  TO full_stack_database_aeds_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES  TO full_stack_database_aeds_user;


--
-- PostgreSQL database dump complete
--

