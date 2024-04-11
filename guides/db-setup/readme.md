# Local database setup ⚙️

## Initiating the Database

### Create a local database

Use the `createdb` command to create a new database called `videorec`:

```bash
createdb videorec
```

### Initial Data Load

Populate the database with initial data:

```bash
psql -d videorec < db/initdb.sql
```

<details>
<summary>Let's just parse that command clearly:</summary>

1. `psql` : Use the PostgreSQL command-line interface.
2. `-d` : This flag marks the next argument as the database name.
3. `videorec` : The name of the database you want to populate.
4. `<` : The following file will be used as input.
5. `db/initdb.sql` : The path to the SQL file to populate the database.

</details>
<!-- {{</note>}}>-->
<hr/>
<!--{{<note type="tip" title="Connectivity">}}-->

Depending how postgresql was installed for you, you might need to add some connectivity details to both createdb and psql: `psql -h localhost -U username -d videorec < db/initdb.sql` In this example you ask postgres to connect to your local database through localhost and use username as the user.

##### Check 📝

Double-check the command you just used was successful. What should you expect to see in your local database after running this command.

<!--{{</note>}}>-->

### Backup your database

<!--{{<note type="activity" title="Backup">}}-->

Now, let's create a compressed archive of your database for safekeeping. Use the `pg_dump` command with the following options:

```bash
pg_dump -h localhost -U username videorec > videorec_backup.sql.gz
```

<details>
<summary>Explanation:</summary>

- `pg_dump`: This command is designed specifically for creating PostgreSQL database backups.
- `-h localhost` (Optional): Specify the host (`localhost` in most cases) if your PostgreSQL installation differs.
- `-U username` (Optional): Include your username if required for connection.
- `videorec`: This is the name of the database you want to back up.
- `> videorec_backup.sql.gz`:\*\* This defines the filename and format for the backup. The `>` redirects the output to a file, and `.sql.gz` indicates a gzipped SQL archive.

</details>

**Verification:** Check your terminal or file explorer to confirm the existence of the backup file (`videorec_backup.sql.gz`).

<details>
<summary>Stretch: Customize Backup Location</summary>

- You can modify the output filename and location to suit your preference. For example:

```bash
pg_dump -h localhost -U username videorec > backups/videorec_backup_$(date +"%Y-%m-%d").sql.gz
```

- This command incorporates the current date in the filename for easy identification and versioning.
</details>

<!--{{</note>}}>-->

### Removing, Re-initializing, and Restoring

Now that we have a backup, let's practice removing and re-initializing the database:

#### 1. Drop the Database

Use the `dropdb` command followed by the database name (`videorec`) to remove the database:

```bash
dropdb videorec
```

**Confirmation:** Verify that the database is gone by trying to connect to it with `psql -d videorec`. You should receive an error message indicating the database doesn't exist.

#### 2. Recreate the Database

Use the same `createdb` command from before to create a new empty database with the same name (`videorec`):

```bash
createdb videorec
```

#### 3. Restore from Backup

Use `psql` with the `-f` flag to specify the backup file and restore the data into the newly created database:

```bash
psql -d videorec -f videorec_backup.sql.gz
```

#### 4. Verify

Connect to the database (`psql -d videorec`) to confirm the tables and data have been restored successfully.

## Sample data

You will need some example video data in your database. Please check [the example data](./data/example_data.csv), and modify your `initdb.sql`. Add the relevant `INSERT INTO` calls that will add all of this example data every time you run `initdb.sql`.
