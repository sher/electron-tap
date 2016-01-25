# electron-tap
Electron test runner for Tape

![electron-tap](https://raw.githubusercontent.com/tundrax/electron-tap/master/images/demo.gif)
## Installation
```bash
$ cd your-project
$ npm i --save-dev tape electron-tap
```
## Usage
Define a new script in your `package.json`.
`--renderer` option accepts a `glob`.
```js
// ...
"scripts": {
  "test:renderer": "electron-tap --renderer 'test/**/renderer/*test.js?(x)'"
}
```
As an example we will test a React component.
Create a new test file in directory `test/renderer/Dummy-test.jsx`.
```jsx
// Dummy-test.jsx
import test from 'tape';
import reporter from 'electron-tap/reporter';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils';

class Dummy extends Component {
  render() {
    const style = {
      height: '60px',
      padding: '10px'
    };

    return (
      <div style={style}>Dummy component</div>
    )
  }
}

test('Dummy Component', function (t) {
  const container = document.createElement('div');
  document.body.appendChild(container);

  const component = ReactDOM.render(<Dummy />, container);
  const node = ReactDOM.findDOMNode(component);

  // assertion fails because of paddings and box-model
  t.equal(node.offsetHeight, 60, 'control height is 60px');

  document.body.removeChild(container);
  container = null;
  t.end();
});
```
Now run your test.
```bash
$ npm run test:renderer
```
This will open `electron` window, run all tests, output `spec`-like results to the `Console` tab in `dev-tools`, watch for changes in test files.
