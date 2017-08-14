# react-native-progress-overlay
A smart progress overlay for React Native that shows a loading spinner and blocks the ui

## Install

Install using yarn:

`yarn add react-native-progress-overlay`

Or npm:

`npm install --save react-native-progress-overlay`

### Implementation

```js
import ProgressOverlay from 'react-native-progress-overlay';

<View>
	<View>
		<Text>This view will be overlayed</Text>
	</View>
	<ProgressOverlay active	/>
</View>
```

### Properties

| Prop | Description | Default |
|---|---|---|
|**`active`**|Whether or not to show the overlay. |`false`|
|**`animateIn`**|If set to true, the overlay will fade in when it becomes active. |`true`|
|**`delay`**|A delay, in milliseconds, before the overlay is shown when i becomes active (to avoid flickering). |`100`|
|**`color`**|The background color of the overlay. |`rgba(0, 0, 0, 1)`|
|**`style`**|Any custom styles for the overlay <View />. |*None*|
