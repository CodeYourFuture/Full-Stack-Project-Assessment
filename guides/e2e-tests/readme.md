# End-to-end tests 🧪

While unit and integration tests usually only check part of the stack (like the frontend tests only check the frontend but don't connect to the backend), end-to-end (E2E) tests are specifically designed to check the interaction of the entirety of the stack - frontend, backend and database.

## Playwright

The biggest E2E frameworks are Selenium, Cypress and Playwright. Each of them allow you to run a browser instance and automate what happens inside it. For this requirement, we picked Playwright as the framework.

For example you can write Playwright code that opens up your application, then clicks the "Remove video" button on the page, checking that the video is indeed removed from the website.

## Setup

Just with the other tests, we have helped you get started by setting up a test runner for your feature tests, and adding a couple tests to `e2e/tests/features.test.js`. These tests would go through the website and check that you can do all of the required features.

**Note:** for this to work you need to make sure you have setup the test backend database. If you haven't done so please refer to that section to set up your test database first.

To run your end-to-end tests there are three steps you need to do:

1. Install Playwright browsers

Playwright will use its own browsers instead of the one installed on your computer. To install the browsers type

```sh
npx playwright install
```

You'll only need to do this once.

2. Stop any running server

Playwright will start up your backend and frontend automatically, but it will not be able to do that properly if you're already running them

3. Start the feature tests:

```sh
npm run test:e2e
```

This command will run the test in the background. If you want to check what Playwright does in the browser you can use

```sh
npm run test:e2e:headed
```

This will start up the browsers in the foreground. Both options will then click around very quickly trying to run the features - adding and deleting videos as well as ranking existing videos up and down.

(Playwright also has a full UI mode where you can play around with your tests. This is accessible via `npm run test:e2e:ui`)

**Note:** just like with the other pre-created tests this might fail depending on how you have implemented your frontend, backend and database parts. Please check the test code and update it to make sure it runs successfully. Some changes that you need to do will be similar to the level 299 frontend tests - like if you don't have a `"Remove video"` button but have something else you need to change the code to find that button. Similarly, the current test assumes that the HTML structure of your video components look like the one below:

```html
<div class="video">
	<h1>
		<a href="...">The title of the Video</a>
	</h1>
	<iframe (...)></iframe>
</div>
```

Here to get from the title to the video container you need to go two levels up. First from `<a>` to `<h1>`, then from this `<h1>` to `<div class="video">`. If your website is structured differently you will need to update this in the tests.

## Enable PR tests

Tests are useful to run every time you create a PR to make sure you don't accidentally add or change code that breaks existing functionality. You can go to `.github/workflows/run-e2e.yml` and remove the comment from the line that says `pull_request:`. This will run the `npm run test:e2e` call every time you create a new PR blocking merging in case tests fail.

## Add new test cases

You might want to add tests to cover some additional scenarios. For example if you have opted into doing the ordering feature you might want to add a test that checks that sorting by ascending and descending really updates the page to sort accordingly.

## Next Level

Once finished please check if you have missed any optional features before, and finish them. If you have done all of them, then congratulations, you have finished this exercise 100%!

Feel free to use this project as part of your portfolio. You might also use it as a base project to start with testing out new ideas, frameworks or deployment services.
