# Local database setup ⚙️

## Initiating local database

Once you have your schema ready, make sure you create a new database for yourself locally. For example, let's call it `videorec`. From a shell use `createdb` to create a new database for yourself:

```bash
createdb videorec
```

Once it is created you can now try to load your file into the database using `psql`:

```bash
psql -d videorec < db/initdb.sql
```

**Note:** Depending on how postgresql was installed for you, you might need to add some connectivity details to both `createdb` and `psql`:

```bash
psql -h localhost -U username -d videorec < db/initdb.sql
```

In this example, we ask postgres to connect to your local database through `localhost` and use `username` as the user.

## Re-running the script

It is advised to make sure that the `initdb.sql` script can be run multiple times, and each run would reset the database to a known initial state. One way to do it is to add some SQL code to the start that would delete tables in case they exist, something like:

```sql
DROP TABLE IF EXISTS videos CASCADE;
```

Try running your `initdb.sql` script multiple times with the `psql` code above to make sure every time you get a fresh and clean database without errors.

## Sample data

You will need some example video data in your database. Please check [the example data](./data/example_data.csv), and modify your `initdb.sql`. Add the relevant `INSERT INTO` calls that will add all of this example data every time you run `initdb.sql`.
