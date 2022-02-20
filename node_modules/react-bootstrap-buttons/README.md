# react-bootstrap-buttons [![build status](https://travis-ci.org/cheton/react-bootstrap-buttons.svg?branch=master)](https://travis-ci.org/cheton/react-bootstrap-buttons) [![Coverage Status](https://coveralls.io/repos/github/cheton/react-bootstrap-buttons/badge.svg?branch=master)](https://coveralls.io/github/cheton/react-bootstrap-buttons?branch=master)

[![NPM](https://nodei.co/npm/react-bootstrap-buttons.png?downloads=true&stars=true)](https://nodei.co/npm/react-bootstrap-buttons/)

React Bootstrap buttons.

Demo: https://cheton.github.io/react-bootstrap-buttons

## Installation

1. Install [react-bootstrap-buttons](https://github.com/cheton/react-bootstrap-buttons):

  ```
  npm install --save react-bootstrap-buttons
  ```

2. Import `react-bootstrap-buttons` and its styles in your application as follows:

  ```js
  import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';

  // Be sure to include styles at some point, probably during your bootstraping
  import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';
  ```

### Recommended Setup

Create a `Buttons` component inside your common components directory:
```
components/
  Buttons/
    index.js
```

**components/Buttons/index.js**
```js
import 'react-bootstrap-buttons/dist/react-bootstrap-buttons.css';

export { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap-buttons';
```

Then, import `Button` component in your code:
```js
import { Button } from 'app/components/Buttons';
```

## Examples

Examples for each component can be seen in [the documentation](examples).

Here are some online demos of each component:
* [Button](https://cheton.github.io/react-bootstrap-buttons/#button)
* [ButtonGroup](https://cheton.github.io/react-bootstrap-buttons/#buttongroup)
* [ButtonToolbar](https://cheton.github.io/react-bootstrap-buttons/#buttontoolbar)

## API

### Properties

#### Button

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
tag | Function or String | 'button' | Pass in a component to override default button element.
type | One of:<br/>'button'<br/>'reset'<br/>'submit' | 'button' | Specifies the type of button.
lg | Boolean | | Large button.
md | Boolean | | Medium button.
sm | Boolean | | Small button.
xs | Boolean | | Extra small button.
btnStyle | One of:<br/>'default'<br/>'primary'<br/>'secondary'<br/>'danger'<br/>'warning'<br/>'info'<br/>'success'<br/>'light'<br/>'dark'<br/>'link'<br/> | 'default' | Component visual or contextual style variants.
outline | Boolean | false | Specifies whether to remove background image and color on a button.
block | Boolean | false | Specifies whether to span the full width of a parent.
active | Boolean | false | Specifies whether to add active effect to a button.
hover | Boolean | false | Specifies whether to add hover effect to a button.
focus | Boolean | flase | Specifies whether to add focus effect to a button.
disabled | Boolean | flase | Specifies whether a button should be disabled or not.

#### ButtonGroup

Name | Type | Default | Description 
:--- | :--- | :------ | :----------
lg | Boolean | | Large button group.
md | Boolean | | Medium button group.
sm | Boolean | | Small button group.
xs | Boolean | | Extra small button group.
btnStyle | One of:<br/>'default'<br/>'primary'<br/>'secondary'<br/>'danger'<br/>'warning'<br/>'info'<br/>'success'<br/>'light'<br/>'dark'<br/>'link'<br/> | | Component visual or contextual style variants.
vertical | Boolean | false | Specifies whether a button group should be aligned vertically or not.

#### ButtonToolbar

Name | Type | Default | Description 
:--- | :--- | :------ | :----------

## License

MIT
