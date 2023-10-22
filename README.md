# react-map-dashboard

A simple map component for your dashboard.

## Demo

[react-map-dashboard playground](https://react-map-dashboard-playground.vercel.app/)

## Usage

```sh
npm install --save react-map-dashboard
```

```jsx
import { MapComponent } from "react-map-dashboard";

<MapComponent colors={colors} layers={layers} countriesData={countriesData} />;
```

You can pass arrays of your own colors and value ranges. Each range should correspond to a separate color. For example:

```jsx
const colors = ["#f2f0f7", "#dadaeb", "#bcbddc"];

const layers = ["0-10", "10-50", "50-100"];
```

`countriesData` is an array of objects. Each object should have a "name" property and a "amount" property. Additionally, you can add an additional `data` object to each object with the data required for your custom tooltip. For example:

```jsx
countriesData: [
    { country: "CN", amount: 100 },
    { country: "CA", amount: 1000 },
    { country: "FR", amount: 10, data: { some: 'data'} },
  ],
```

This library uses [country-list](https://github.com/fannarsh/country-list) as a dependency, so you can use it to get proper country codes and create your `countriesData`.

## Custom tooltip

You can use both the standard tooltip and your custom one. To do this, create a component and pass it to `customTooltip`:

```jsx
const CustomTooltip = (props) => {
  return (
    <div>
      <p>{props.country}</p>
      <p>{props.some}</p>
    </div>
  );
};

const MapComponent = () => (
  <MapComponent
    colors={colors}
    layers={layers}
    countriesData={countriesData}
    customTooltip={CustomTooltip}
  />
);
```

## License

MIT © [krodetsa](https://github.com/krodetsa)

---
