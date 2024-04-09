# Automated tests (Optional)

The below points are improvement ideas that you can add to your project to become a great project. If you want this project to be part of your portfolio we suggest that you implement at least some of the optional features. You don't need to do all of them during this week, you are free to revisit this list later

## 1) Backend unit tests

Automated tests are code that, when run, will check that your code adheres to some pre-set conditions, usually your acceptance criteria. With the help of automated tests you can make sure that even if you add new features to your code, your existing features remain working. Breaking existing features when adding new ones is very common in the engineering world, there is a word for it as well: "regression".

Unit tests only check a small subset (a unit) of your application at a time. These tests can usually be both written and run quickly so they are a good way of determining that the application is doing what it should be doing.

You can test your backend in isolation, your frontend in isolation and you can also have tests that check both of them at the same time. For this level, we will start by adding tests for your backend.

### Setting up backend unit tests ⚙️

We have helped you get started by setting up a test runner for your backend systems and adding a couple tests to `server/api.test.js`. These tests would check that the list and delete endpoints works as expected.

First you need to set up the tests. To do that make sure you create a separate database for tests. For example let's call it `videorec_test`:

```sh
createdb videorec_test
```

Afterwards edit your `.env` file and change the `TEST_DATABASE_URL` to point to this database.

**Note:** we are using a different database to make sure that we don't accidentally modify your normal database every time when you run your tests.

Once you have set up the database settings you can now run the tests by calling

```sh
npm run test:server
```

Check the response, it will tell you if the tests have succeeded or not. It is possible that you will need to update the test to cater for how you have implemented your backend.

### Transactional tests

The test runner above is set up to have transactional tests. What this means is that whenever you start the testing session, the code will reset your (test) database using the `initdb.sql` you have created in [level 110](./110.md). Afterwards it will run each test in a database transaction, rolling it back at the end of the test. Database transactions are a feature of most relational databases that allows you to run SQL commands in a temporary environment first, and only if you are happy with the results will they be saved to the database. It's a bit like editing a file and not saving it until you are happy with the result.

We use this feature during test runs. We effectively ask the database to never save our changes at the end of the tests. This allows each test case to start with the exact same, initial database as every other test. For example when testing the video removal features, during the test the video will be removed, but once the tests are run, the database is reset, and subsequent tests will still be able to access the deleted video.

### Enable PR tests

Tests are made much more useful if they run every time you create a PR. This way GitHub will make sure to run them and let you know if your latest code is not working anymore based on the tests. To enable backend tests you should to `.github/workflows/run-server-tests.yml` and remove the comment from the line that says `pull_request:`. This will run the `npm run test:server` call every time you create a new PR blocking merging in case tests fail.

To confirm, the top of the file should look like this:

```yaml
on:
  workflow_dispatch:
  pull_request:
```

This will allow GitHub to run the defined action on each pull request, and you can also run it ad-hoc from the "Actions" page whenever you wish.

**Note:** Make sure to have a full read of this file and try to figure out what it does.

### Adding additional tests

Based on the existing tests in the system you could try and create one that checks the add video functionality we added during [level 210](./210.md) as well. It should verify that videos are added if the request is formatted properly, but fail if the request is missing the title, or the URL is incorrect.

## 2) Frontend unit tests

Similar to the backend unit tests we can create tests that verify that the frontend is working as expected in an automated way.

### Setup

To setup frontend tests we have helped you get started by adding a couple tests to `client/test/App.test.js`. These would check that the page, after loading, contains enough `<iframe>` blocks, as well as whether the `Remove video` button works as expected, by decreasing the number of `<iframe>`s on the page. To run these tests type in the following command:

```sh
npm run test:client
```

Check the response, it will tell you if the tests have succeeded or not. You will likely need to update the test to cater for how you have implemented your website. For example, if you don't have a button that says `Remove video` but for example opted to put a little trashcan icon instead, you will need to change the sections where the code presses the `Remove video` button to instead find and press your trash icon on the page.

### Enable PR tests

Tests are useful to run every time you create a PR to make sure you don't accidentally add or change code that breaks existing functionality. You can go to `.github/workflows/run-client-tests.yml` and remove the comment from the line that says `pull_request:`. This will run the `npm run test:client` call every time you create a new PR blocking merging in case tests fail.

**Note:** Make sure to have a full read of this file as well and try to figure out what it does. Do you see any similarity with the other workflow files?

### Adding additional tests

You might want to add some new test cases. Here are some examples:

- Verify that the create video button works
- Verify that the user cannot create videos with invalid URLs (if you have implemented this on the frontend as well)

## Next Level

Once finished you can go to [Level 300](./300.md)
