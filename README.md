# Storyteq platform integration

Integrate with components of the Storyteq platform.

## Usage

```
npm i @storyteq/platform-integration
```

```
import StoryteqPlatform from '@storyteq/platform-integration';
```

## Available pages

#### General usage

Each page's instance provides the following methods;

__on(event: String, callback: Function)__

Depending on the context, the callback can contain different or no arguments.

__destroy()__

Destroy the currently active page instance.

#### Create media form

__Usage example__
```js
const createMediaPage = new StoryteqPlatform.createMediaPage(
  '#element-to-spawn-into',
  'AUTH_TOKEN',
  1000, // template ID,
  {
    assetManagerScope: [], // Scope the asset selection to set of asset providers
    publish: [ {} ], // Upon rendering completion, publish to this channel
  },
);

createMediaPage
  .on('loaded', () => console.log('loaded'))
  .on('created', (media) => {
    console.log({ media });
  });
```