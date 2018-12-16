# DraftJS Mention Plugin

*This is a fork of the original `draft-js-mention-plugin`*
*This is a plugin for the `draft-js-plugins-editor`.*

This plugin allows you to add mentions to your editor!

Modifications:

This fork provides @kultii specific alternatives on how to handle the mentions, through custom modifiers.

Now the mention plugin can take two more configuration options that dictates which modifier should be used.

*modifierType* can be either _default_ or _product_

#### Example

```js
    this.mentionPlugin = createMentionPlugin({
      mentionComponent: mentionComponent,
      modifierType: 'product',
      productMentionPrefix: '@',
    });
```


Usage:

```js
import createMentionPlugin from 'draft-js-mention-plugin';

const mentionPlugin = createMentionPlugin({ mentions });
```

## Importing the default styles

The plugin ships with a default styling available at this location in the installed package:
`node_modules/draft-js-mention-plugin/lib/plugin.css`.

### Webpack Usage
Follow the steps below to import the css file by using Webpack's `style-loader` and `css-loader`.

1. Install Webpack loaders: `npm install style-loader css-loader --save-dev`
2. Add the below section to Webpack config (if your Webpack already has loaders array, simply add the below loader object(`{test:foo, loaders:bar[]}`) as an item in the array).

    ```js
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: [
          'style-loader', 'css'
        ]
      }]
    }
    ```

3. Add the below import line to your component to tell Webpack to inject style to your component.

    ```js
    import 'draft-js-mention-plugin/lib/plugin.css';
    ```
4. Restart Webpack.
