# ComponentLabel

This component can be used to append a DOM-friendly label to a component that is missing it.

Disclaimer: This component was built by the community at large and is not an official Coveo JSUI Component. Use this component at your own risk.

## Getting Started

1. Install the component into your project.

```
npm i @coveops/component-label
```

2. Use the Component or extend it

Typescript:

```javascript
import { ComponentLabel, IComponentLabelOptions } from '@coveops/component-label';
```

Javascript

```javascript
const ComponentLabel = require('@coveops/component-label').ComponentLabel;
```

3. You can also expose the component alongside other components being built in your project.

```javascript
export * from '@coveops/component-label'
```

4. Or for quick testing, you can add the script from unpkg

```html
<script src="https://unpkg.com/@coveops/component-label@latest/dist/index.min.js"></script>
```

> Disclaimer: Unpkg should be used for testing but not for production.

5. Include the component in your template as follows:

Place the component in your markup:

```html
<div class="CoveoComponentLabel"></div>
```

## Options

The following options can be configured:

| Option | Required | Type | Default | Notes |
| --- | --- | --- | --- | --- |
| `content` | No | string | `label` | Content of the label. |
| `contentType` | No | string | `text` | Specifies the content type of the label. Valid values are `header` or `text`. |
| `labelType` | No | string | empty string | Specifies the logic we will apply as to the visibility of the label. Valid values are `pager` or `breadcrumb`. If no value is provided, we will simply display the label. |
| `shouldBeLocalized` | No | boolean | `false` | Specifies whether to translate the label's value. |

## Extending

Extending the component can be done as follows:

```javascript
import { ComponentLabel, IComponentLabelOptions } from "@coveops/component-label";

export interface IExtendedComponentLabelOptions extends IComponentLabelOptions {}

export class ExtendedComponentLabel extends ComponentLabel {}
```

## Contribute

1. Clone the project
2. Copy `.env.dist` to `.env` and update the COVEO_ORG_ID and COVEO_TOKEN fields in the `.env` file to use your Coveo credentials and SERVER_PORT to configure the port of the sandbox - it will use 8080 by default.
3. Build the code base: `npm run build`
4. Serve the sandbox for live development `npm run serve`