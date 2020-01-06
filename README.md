# Incrudable Forms

## Declarative form library for faster finishing

[![Dependency Status](https://david-dm.org/incrudable/forms.svg)](https://david-dm.org/incrudable/forms)
[![devDependency Status](https://david-dm.org/incrudable/forms/dev-status.svg)](https://david-dm.org/incrudable/forms?type=dev)

[![GitHub forks](https://img.shields.io/github/forks/incrudable/forms.svg?style=social&label=Fork)](https://github.com/incrudable/forms/fork) [![GitHub stars](https://img.shields.io/github/stars/incrudable/forms.svg?style=social&label=Star)](https://github.com/incrudable/forms)

----

## The Goal of Incrudable Forms

Building forms for web applications can be tedious. Making them
dynamic is downright hard. Incrudable Forms has your back! Incrudable
Forms helps developers finish their applications faster by providing a
declarative API for form generation.

## Prerequisites

Incrudable Forms is an Angular library. As of 12-2019 it has only been tested against Angular 8.*

## Table of Contents

* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [incrudable-renderer component](#incrudable-renderer-component)
* [Form and Control Definitions](#form-and-control-definitions)
* [Built-in Renderers](#built-in-renderers)
* [Built-in Form Controls](#built-in-form-controls)
* [Defining Custom Renderers](#defining-custom-renderers)
* [Hooks](#hooks)
* [Interactions](#interactions)
* [Validations](#validations)
* [About the Author](#about-the-author)
* [License](#license)

## Demo

https://stackblitz.com/edit/incrudable-forms-demo

## Installation

**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites)

### Install Locally

Normally, Incrudable Forms is used with a renderer. The default renderer
of choice is the Material Renderer. Later in this document you will see
how to change the renderer as well as how to build your own. For now,
let's stick with the default. We'll need the "forms" library and the
"material-form-renderer" packages.

```bash
npm install @incrudable/forms @incrudable/material-form-renderer
```

or

```bash
yarn add @incrudable/forms @incrudable/material-form-renderer
```

## Usage

### Module Setup

Let's start by adding the "material-form-renderer" module to the
application:

```ts
import { NgModule } from '@angular/core'
// Import the renderer module
import { RenderersMaterialRendererModule } from '@incrudable/material-form-renderer'

@NgModule({
  imports: [
    BrowserModule,
    // Register the module with your application
    RenderersMaterialRendererModule
  ]
})
export class AppModule {}
```

### Adding a form to the page

We are now free to use the Incrudable Renderer component.

```ts
// app.component.ts
import { Component } from '@angular/core';
import { Control, Form } from '@incrudable/forms';

@Component({
  selector: 'app-root',
  // Reference the incrudable renderer from the template
  template: `
    <incrudable-renderer [controls]="controls">
    </incrudable-renderer>
  `,
})
export class PreviewModalComponent {
  // Setup the declarative form structure

  // Control Definitions
  controls: Control[]= [{
    label: 'A Dynamic Input!',
    propertyName: 'myFirstControl',
    type: 'input'
  }];
}

```

### Accessing form data

The form object is generated for you and made available from the
FormRendererService

```ts
// app.component.ts
import { Component } from '@angular/core';
// Bring in the service type for Typescript support
import { Control, Form, FormRendererService } from '@incrudable/forms';

@Component({
  selector: 'app-root',
  template: `
  <incrudable-renderer [controls]="controls">
  </incrudable-renderer>`,
})
export class PreviewModalComponent {
  controls: Control[]= [{
    label: 'A Dynamic Input!',
    propertyName: 'myFirstControl',
    type: 'input'
  }];
  // inject the form renderer service
  constructor(formRendererService: FormRendererService){
    const formGroup = formRendererService.dynamicForm;
    // Access the values as they change over time
    formGroup.valueChanges
      .subscribe(formValue => console.log('formValue', formValue));
  }
}
```

The dynamicForm IS an Angular FormGroup. Feel free to use it as such!

## incrudable-renderer Component

The Incrudable Renderer component takes in the form and control
definitions and renderers the form.

### selector

\<incrudable-renderer>

### inputs

controls - an array containing [The list of control definitions](#control-definition) - Required

### events

None

## Form and Control Definitions

Form and Control definitions are the declarative magic behind Incrudable
Forms. They are JSON objects that the incrudable-renderer can transform
into an Angular Form. If you are familiar with Angular Forms, you can
think of these are super powered FormGroup definitions.

### Form Definition

Form definitons provide a top level description of the form and any rules
or behaviors that span across multiple controls. At the moment, the
functionality of the form definition is nearly non-existent. Stay tuned
as feature development continues.

#### form definition example

```json
{
  "id": 1,
  "name": "myFirstForm"
}
```

#### form definition properties

* id - Unique identifier - useful when persisting forms to a database
* name - A user friendly display name - useful when viewing a form with
  a tool such as [Dynamic form admin](https://ng-dynamic-forms-425c3.firebaseapp.com/dashboard)

### Control Definition

Control definitions describe the list of controls that comprise a form.

#### control definition example

```json
[
  {
    "propertyName": "myFirstControl",
    "label": "A Dynamic Input!",
    "type": "input"
  }
]
```

#### control definition properties

* label - required - human readable value that will label the control on
  the rendered form
* propertyName - required - key that will be used to attach the
  control to a form group. The user supplied value can also be found under this
  property name. Each control must have a unique propertyName
* position - optional - coordinate and sizing values that describe the
  layout of the control. Based on [Angular Gridster properties](https://github.com/tiberiuzuld/angular-gridster2/blob/master/projects/angular-gridster2/src/lib/gridsterItem.interface.ts)
* type - required - the [type](#built-in-form-controls) of UI control to
  render.
* typeOptions - optional - certain control types require additional
  information. For example, select needs additional details concerning the list of options a user can choose from.

  example

  ```json
  {
    "optionSource": "static",
    "options": [{
      "label": "first option",
      "value": 1
    }]
  }
  ```

  typeOptions properties:

  * options - optional - An array of "Option"s often used with select,
      checkbox groups and radio groups.

      Option properties:

    * label - required - string value used to label the option on the UI
    * propertyName - required - only used by checkboxGroups, used to
      indicate which options are selected. Each option within an option array much hae a unique propertyName
    * value - required - the value associated with this option. Used
      primarily with select controls.
  
  * optionSource - required - string value indicating where the renderer
    should expect to find the list of options. There are currently two
    options, "static" and "dynamic". "static" is used when the list of
    options and their values are known ahead of time and can be
    statically supplied as part of the control definition. When set to
    "static" the developer must also supply a valid value for the
    "options" property. "dynamic" is used when the options are provided
    by a [hook](#hooks). Usually, this means the options are to be
    fetched using an AJAX request. When set to "dynamic" the developer
    must also supply a valid "optionSourceHook"

  * optionSourceHook - optional - a string used to identify which [hook]
    (#hooks) should be called to obtain the list of "options". The hook
    must return an Observable<Option[]>
  
## Built-in Renderers

The core implemenation of Incrudable Forms is decoupled from any one
particular look and feel. Instead, it works together with a renderer to
produce the form that a user interacts with.

Renders have two roles. 1. provide the look and feel for the various
control types. 2. Determine how form and control definitions affect user
interactions.

In short, Incrudable/Forms interprets the data, creates the form group and
determines the rules for the form. Renderers create the UI and behavior
from these rules.

Today, Incrudable provides the following renderers:

* [@Incrudable/material-form-renderer](https://www.npmjs.com/package/@incrudable/material-form-renderer) - Provides Angular Material visuals and behavior

## Built-in Form Controls

Incrudable Forms supports the following control types

| Control Type | Identifier | Material Renderer Support | Description                                                     |
|--------------|------------|---------------------------|-----------------------------------------------------------------|
| input        | input      | ✔                         | simple text input field                                         |
| select       | select     | ✔                         | drop down supporting static or dynamic options                  |
| date         | date       | ✔                         | simple date picker                                              |
| check group  | checkGroup | ✔                         | group of check boxes allowing a user to select multiple options |
| radio group  | radioGroup | ✔                         | radio group allowing the user to select a single option         |

## Defining Custom Renderers

In addition to the built-in renderers it is also possible to build your own. This typically involves two parts; building your custom input components and registering them with the Incrudable Forms module.

Each control component must accept two inputs

* control - accepts the Control definition it should render
* formControl - an Angular FormControl that is generated from the control definition

It is up to you to choose how the control should be rendered and connected to the form control. You can see an example of how the material
renderer connects these controls [here](https://github.com/incrudable/forms/tree/master/libs/renderers/material-renderer/src/lib/control-previews/input-preview)

Once you have each of your controls built, they need to be registered.
To do this, create a module. The following shows how the material renderer registers its controls.

```ts
const controls: ControlMapping = {
  input: { control: InputPreviewComponent },
  select: { control: SelectPreviewComponent },
  radioGroup: { control: RadioPreviewComponent },
  checkGroup: { control: CheckboxPreviewComponent },
  date: { control: DatePreviewComponent }
};

const controlList = [
  InputPreviewComponent,
  SelectPreviewComponent,
  RadioPreviewComponent,
  CheckboxPreviewComponent,
  DatePreviewComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormEngineModule.forRoot(controls, controlList),
    MaterialDepsModule
  ],
  declarations: [
    InputPreviewComponent,
    SelectPreviewComponent,
    RadioPreviewComponent,
    CheckboxPreviewComponent,
    DatePreviewComponent
  ],
  exports: [FormEngineModule]
})
export class RenderersMaterialRendererModule {}
```

With the controls defined and registered. The module they are registered with can be used in place of a built-in renderer.

## Hooks

Hooks are a way of connecting the declarative form definitions to
developer's business logic. At the moment, hooks are only used with dynamic option lists.

### Registering Hooks

In order for the Forms library to execute code on your behalf
it needs to be registered. The Form Library will inject and use the HooksService
at run time. It is in this service that the formHooks are stored in a simple Typescript map.
This provides developers the oppourtunity to supply hooks by injecting the HooksService into their
application code and setting additional hooks.

```ts
// MyHookService
// Uses HttpClient to fetch options
export class MyHookService {
  constructor(private httpClient: HttpClient, private hooksService: HooksService){
    hooksService.formHooks.set('answerList', this.getAnswers.bind(this))
  }

  getAnswers(){
    return this.httpClient.get<Option[]>('/api/answers')
  }
}
```

The "answerList" hook can now be used from a control

```ts
const questionOptions: TypeOptions = {
  optionSource: 'dynamic',
  optionSourceHook: "answerList"
};
```

## Interactions

Interactions are part of the Control definition that describes how a
user's interaction with a control affect a change in another control

Interactions are still a work in progress

## Validations

Validations are part of the Control and Form definitions that describe
what makes a user's interaction with a control valid.

Validations are still a work in progress

## About the Author

Paul Spears
[@TheEverGreenDev](https://twitter.com/TheEvergreenDev)

With support from [Oasis Digitial Solutions Inc](https://oasisdigital.com)

## License

[MIT](https://github.com/angular/angular-cli/blob/master/LICENSE)
