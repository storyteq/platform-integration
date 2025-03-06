# Storyteq platform integration

Integrate with components of the Storyteq platform.

## Development

Inside of src/test.ts you need to set up your TEST_API_KEY.

```
npm i
npm start
```

To change the platform url you need to edit window.APP_URL variable.

## Usage

```
npm i @storyteq/platform-integration
```

```
import * as StoryteqPlatform from '@storyteq/platform-integration';
```
### General usage

It's important to note that the iframe's dimensions are determined by the parent's dimensions, so usually you need to make sure there's always a height for `#element-to-spawn-into`.

Each page's instance provides the following methods;

__on(event: String, callback: Function)__

Depending on the context, the callback can contain different or no arguments.

__destroy()__

Destroy the currently active page instance.

## Production usage

In order for the generated iframe to load correctly, your domains need to be whitelisted in our Content-Security-Policy headers. Please share your testing and production domains with us, so we can add them as allowed frame-ancestors.

## Available pages

### Create media form

__Usage example__
```js
const createMediaPage = new StoryteqPlatform.createMediaPage(
  '#element-to-spawn-into',
  'AUTH_TOKEN',
  1000, // template ID,
  100,  // company ID,
  {
    assetManagerScope: [], // Scope the asset selection to a set of asset providers
    notifications: [ {} ], // Will send a notification to the target route upon media status change with the full media object
    publish: [ {} ], // Upon rendering completion, publish to this channel
  },
);

createMediaPage
  .on('loaded', () => console.log('loaded'))
  .on('created', (media) => {
    console.log({ media });
  });
  .on('batch-created', (batch) => {
    console.log({ batch });
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
  100,  // company ID,
  {
    notifications: [
        {
            type: 'webhook',
            route: 'https://my-webhook-site.com'
        }
    ],
    publish: [ {} ], // Upon rendering completion, publish to this channel
    mediaRecreateHash: '11abcaaaa0abcdabcabcabca49abx321',
    // creationType: 'batch', // if left empty, it will default to single media create form
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
  .on('batch-created', (batch) => {
    console.log({ batch });
  });
```

#### General configuration Attributes

##### mediaRecreateHash
\
By setting the value of ```mediaRecreateHash``` to a media hash, all parameter values that was used to create this media will be directly applied in the media create form.

##### notifications
\
Optional parameter. An array of objects containing two string keys: ```type``` and ```route```. ```type``` should be set to ```'webhook'```, while ```route``` is the webhook url. When set, each time a media/creative has it's rendering status updated, the media body will be send to the webhook. Example:

```js
    notifications: [
        {
            type: 'webhook',
            route: 'https://my-webhook-site.com'
        }
    ],
```

##### publish
\
Optional parameter. An array of objects containing two string keys: ```type``` and ```variant```. ```type``` should be set to an connection driver type set up on your Storyteq workspace ie. ```'google_drive'```, while ```variant``` is the desired render output, possible options are ```video, image, banner```. Note that the variant must be supported by the publish driver, otherwise upload will fail. Example:

```js
    publish: [
        {
            type: 'google_drive',
            variant: 'video'
        }
    ],
```

##### creationType
\
Optional parameter. Leaving it empty will result in spwaning the single media creation form. But by setting ```creationType``` to the string value ```batch```, you will instead spawn the batch creation form. This form allows you to create several media in one go.

#### UI Configuration Attributes

##### forceMediaPreviewBeforeCreate
\
For after effects template, ```forceMediaPreviewBeforeCreate``` allows you to enforce the creation of a 'rich preview' before action creation/publishing can be made.

| Option (string) | Description                                                                               |
|-----------------|-------------------------------------------------------------------------------------------|
| always          | Always enforce rich preview before creation, even after changes are applied               |
| on_first_render | Only enforce rich preview once. Changing parameter values will not enforce a new preview. |

##### customizationItems
\
```customizationItems``` is an array of configuration objects which allow you to customize the general UI.
\
Possible configurations:

| Attribute           | Description                                                                                    | Option(s)                      |
|---------------------|------------------------------------------------------------------------------------------------|--------------------------------|
| host_product_name   | Name of your company/product                                                                   | Free text (string)             |
| media_alias         | Alias of media/creative                                                                        | Free text (string)             |
| media_alias_plural  | Alias of media/creative in plural form                                                         | Free text (string)             |
| batch_alias         | Alias of batch                                                                                 | Free text (string)             |
| button_media_create | Media create button custom description/text                                                    | Free text (string)             |
| end_screen_title    | Title of the screen indicating a media or media batch has been created/published               | Free text (string)             |
| end_screen_subtitle | Subtitle of the screen indicating a media or media batch has been created/published            | Free text (string)             |
| color_theme_hex     | Color theme of UI elements such as buttons, loading bars, etc.                                 | Hex code (string)              |
| full_screen         | Choice of having the create form cover the whole screen or not                                 | true/false                     |
| cancelable          | Shows a cancel button on the create media form that will event a 'canceled' event when pressed | true/false (defaults to false) |
| show_end_screen_for_batches | Showing end screen dialog after creating a batch                                       | true/false (defaults to false) |

##### endScreenActions
\
```endScreenActions``` is an array of configuration objects that allows you to customize the UI of the 'end screen', by adding certain actions.
The end screen is what appears after you have initiated the creation/publishing of a media or media batch.
\
Possible configurations:

| Attribute/Action     | Description                                                                | Option(s)                         |
|----------------------|----------------------------------------------------------------------------|-----------------------------------|
| create_another_media | By including this, a button will appear that allow you to recreate a media | Free text (string, inside button) |
| create_another_batch | By including this, a button will appear that allow you to recreate a batch | Free text (string, inside button) |
