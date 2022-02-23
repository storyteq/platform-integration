# Storyteq platform integration

Integrate with components of the Storyteq platform.

## Development

Inside of src/index.js you can change anthing inside `isTesting` conditionals to test around with settings.

```
cp .env.example .env
# Edit your env
# TEST_API_KEY="YOUR_TOKEN"
# ENVIRONMENT="testing"


nvm use 10
npm i
npm start
```

To change the platform url you need to edit index.js.

## Usage

```
npm i @storyteq/platform-integration
```

```
import StoryteqPlatform from '@storyteq/platform-integration';
```
### General usage

It's important to note that the iframe's dimensions are determined by the parent's dimensions, so usually you need to make sure there's always a height for `#element-to-spawn-into`.

Each page's instance provides the following methods;

__on(event: String, callback: Function)__

Depending on the context, the callback can contain different or no arguments.

__destroy()__

Destroy the currently active page instance.

### Production usage

In order for the generated iframe to load correctly, your domains need to be whitelisted in our Content-Security-Policy headers. Please share your testing and production domains with us so we can add them as allowed frame-ancestors.

## Available pages

### Create media form

__Usage example__
```js
const createMediaPage = new StoryteqPlatform.createMediaPage(
  '#element-to-spawn-into',
  'AUTH_TOKEN',
  1000, // template ID,
  {
    assetManagerScope: [], // Scope the asset selection to a set of asset providers
    publish: [ {} ], // Upon rendering completion, publish to this channel
  },
);

createMediaPage
  .on('loaded', () => console.log('loaded'))
  .on('created', (media) => {
    console.log({ media });
  });
```

### CRM Analytics page

__Usage example__
```js
const crmAnalyticsPage = new StoryteqPlatform.crmAnalyticsPage(
  '#element-to-spawn-into',
  'AUTH_TOKEN',
  1000, // template ID,
  1000, // campaign ID,
);

crmAnalyticsPage
  .on('loaded', () => console.log('loaded'));
```

## Create Media form Advanced Configuration Options / UI customization

The integration supports additional configuration options that allows you to customize the media creation UI/UX.

__Advanced Configuration Example__
```js
const createMediaPage = new StoryteqPlatform.createMediaPage(
  '#element-to-spawn-into',
  'AUTH_TOKEN',
  1000, // template ID,
  {
    assetManagerScope: [], // Scope the asset selection to a set of asset providers
    publish: [ {} ], // Upon rendering completion, publish to this channel
    mediaRecreateHash: '11abcaaaa0abcdabcabcabca49abx321',
    ui: {
        forceMediaPreviewBeforeCreate: 'always',
        customizationItems: [
            {
              item: 'host_product_name',
              value: 'Storyteq',
            },
            {
              item: 'media_alias',
              value: 'Media',
            },
            {
              item: 'button_media_create',
              value: 'Publish',
            },
            {
              item: 'end_screen_title',
              value: 'Your asset is being published.',
            },
            {
              item: 'end_screen_subtitle',
              value: 'Your asset will appear in your personal assets when finished.',
            },
           {
              item: 'color_theme_hex',
              value: '#999999'
           },
           {
              item: 'full_screen',
              value: true
          }
        ],
        endScreenActions: [
            {
              action: 'create_another_media',
              value: 'Create Another Media',
            },
        ],
    },
  },
);

createMediaPage
  .on('loaded', () => console.log('loaded'))
  .on('created', (media) => {
    console.log({ media });
  });
```

#### General configuration Attributes

##### mediaRecreateHash
\
By setting the value of ```mediaRecreateHash``` to a media hash, all parameter values that was used to create this media will be directly applied in the media create form.

#### UI Configuration Attributes

##### forceMediaPreviewBeforeCreate
\
For after effects template, ```forceMediaPreviewBeforeCreate``` allows you to enfore the creation of a 'rich preview' before action creation/publishing can be made.

| Option (string) | Description |
| ------ | ------ |
| always | Always enforce rich preview before creation, even after changes are applied |
| on_first_render | Only enfore rich preview once. Changing parmater values will not enforce a new preview. |

##### customizationItems
\
```customizationItems``` is an array of configuration objects which allow you to customize the general UI.
\
Possible configurations:

| Attribute | Description | Option(s) |
| ------ | ------ | ------ |
| host_product_name | Name of your company/product | Free text (string)
| media_alias | Alias of media/creative | Free text (string)
| button_media_create | Media create button custom description/text | Free text (string)
| end_screen_title | Title of the screen indicating a media has been created/published | Free text (string)
| end_screen_subtitle | Subtitle of the screen indicating a media has been created/published  | Free text (string)
| color_theme_hex | Color theme of UI elements such as buttons, loading bars, etc. | Hex code (string)
| full_screen | Choice of having the create form cover the whole screen or not | true/false

##### endScreenActions
\
```endScreenActions``` is an array of configuration objects that allows you to customize the UI of the 'end screen', by adding certain actions.
The end screen is what appears after you have initiated the creation/publishing of a media.
\
Possible configurations:

| Attribute/Action | Description | Option(s) |
| ------ | ------ | ------ |
| create_another_media | By including this, a button will appear that allow you to recreate a media | Free text (string, inside button)
