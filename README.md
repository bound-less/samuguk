# Revenue @ Samuguk

This system provides simulation and optimization tools for planning the SHIWOL Village Event.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/bound-less/samuguk.git
   ```
2. Install dependencies:
   ```
   npm install
   ```

## Usage

To run a basic simulation:

```javascript
const SimulationAPI = require('./src/api/SimulationAPI');

const api = new SimulationAPI();
api.runSimulationWithDefaults()
  .then(results => console.log(results))
  .catch(error => console.error(error));
```

For more detailed usage instructions, refer to the documentation.

## Documentation

documentation\enhanced-notion-wiki-documentation.md

## License

This is not available for public use. Copyright Samuguk 2024.