# SHIWOL Village Event Simulation System

This system provides simulation and optimization tools for planning the SHIWOL Village Event.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/shiwol-village-event-simulation.git
   ```
2. Install dependencies:
   ```
   cd shiwol-village-event-simulation
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

[Link to your documentation, when available]

## License

This project is licensed under the MIT License - see the LICENSE file for details.
