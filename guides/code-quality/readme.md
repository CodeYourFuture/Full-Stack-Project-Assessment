# Code quality improvements (Optional)

While the following work items are completely optional, they will help you to make fewer mistakes as you continue with future requirements. It is generally a good idea to have them when working on projects of any size.

## 1) Proper error handling

You should make your system to be designed with error handling in mind. For example if the database cannot be accessed when you call `GET /api/videos`, then your backend endpoint should return a properly formatted error message with a HTTP `500` error code.

Here is an example response:

```json
{ "success": false, "error": "Could not connect to the database" }
```

**Note:** You can design how you return error messages differently than the above example. You could also try and merge the error and non-error response styles into one. For example the standard `200` response on the same endpoint could be something like the following:

```json
{"success":true,"videos":[(...)]}
```

Once you do this on the backend you should also change your frontend, to make sure it handles errors that are received. For example if your frontend receives an error like above it might show a message like `"Could not connect to the database, please reload the page at a later time"`. Remember, real users don't look in the console, so you'll need to work how where you want to display this error to the users so they see it.

**Note:** Once you add this feature, make sure you keep handling errors properly during the week 2 and week 3 requirements as well.

## 2) Prettying and linting

It is also usually a good idea to make sure that your code is formatted based on a single standard throughout, and also passes basic checks. There are two projects that can usually help you with that:

- `prettier` is a formatter that makes sure that your code is formatted the same way throughout. For example all files use `tab` characters for indenting.
- `eslint` is a linter that checks the code for common coding mistakes and warns you if it encounters any of them. It can also automatically fix some mistakes.

Let's set up both of them!

### `prettier`

First install prettier into your `package.json` file:

```sh
npm install prettier --save-dev
```

Next you will need a `.prettierrc` file in the root directory. We have already provided one for your convenience.

You can now run prettier to check your files:

```sh
npm exec prettier -- --check .
```

And also to automatically fix them:

```sh
npm exec prettier -- --write .
```

If you don't want to type out these commands you can add them as `scripts` into your `package.json` file. For example you can add a line like:

```json
  "prettier": "prettier --write ."
```

to the scripts section, and then you'll be able to automatically pretty your files by typing:

```sh
npm run prettier
```

### `eslint`

Installing `eslint` is similar, but to get the most out of it you will need to install multiple projects:

```sh
npm install eslint eslint-config-prettier eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-refresh eslint-plugin-react-hooks eslint-plugin-n eslint-plugin-jest eslint-plugin-jest-dom eslint-plugin-vitest eslint-plugin-testing-library @codeyourfuture/eslint-config-standard --save-dev
```

This will install `eslint`, and a couple plugins that help you with validating tests, JSX code and React components, like proper `useEffect` usage.

You will also need to have multiple `.eslintrc.json` files, one for each project, tailored to that project's needs. These have also all been provided already.

Once you have everything in place you can run the linter to check for common code mistakes:

```sh
npm exec eslint .
```

You can also ask it to fix any issues it can automatically fix:

```sh
npm exec eslint -- --fix .
```

Same as for `prettier`, you might want to add these commands to your `package.json` for easier access.

### Checks during PRs

It is a good idea to enforce running both the linter and prettier during PRs. One way to do that is to make sure GitHub runs these checks for every PR, blocking the PR in case the code doesn't pass these checks. We have already prepared the `.github/workflows/enforce-linting.yml` file that you can use to run checks on GitHub manually. If you also uncomment the `pull_request` line, you will enable GitHub to run these checks automatically on every PR.

To confirm, the top of the file should look like this:

```yaml
on:
  workflow_dispatch:
  pull_request:
```

**Note:** Make sure to have a full read of this file and try to figure out what it does.
