# nilssongames-snake
Snake game that can be imported as a component in a react app

## Usage
`$ npm install --save nilssongames-snake`
```
import React, {Component} from 'react';
import NilssongamesSnake from 'nilssongames-snake';

class MainApp extends Component {
  render() {
    return (
      <div>
        <NilssongamesSnake />
      </div>
    );
  }
}

export default MainApp;
```

## Webpack config in main project
In some cases your project might break because you are using multiple versions of react. (main project using one, and npm module using its own). To avoid this, when npm linking you might have to include this in your webpack config in the main project:
```
resolve: {
  alias: {
    react: path.resolve('./node_modules/react')
  }
}
```
