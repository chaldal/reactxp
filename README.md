# @Chaldal/ReactXP


## This is a forked version of original ReactXP.
## It supports latest react-native 0.73.1 Issues/PR's are welcome.
## Current version 2.2.0

ReactXP and reactXP extentions are hosted on NPM under `@Chaldal` organization.
https://www.npmjs.com/org/chaldal

This project is maintained by [@aajahid](https://github.com/aajahid) for [@chaldal](https://github.com/chaldal)

ReactXP is a library for cross-platform app development using React and React Native.

## Why ReactXP
With React and React Native, your web app can share most of its logic with your iOS and Android apps, but the view layer needs to be implemented separately for each platform. We have taken this a step further and developed a thin cross-platform layer we call ReactXP. If you write your app to this abstraction, you can share your view definitions, styles and animations across multiple target platforms. Of course, you can still provide platform-specific UI variants, but this can be done selectively where desired.

## Getting Started
The [samples](/samples) directory contains a minimal “Hello World” app that demonstrates some basic ReactXP functionality. You can use this as a starting point. Just follow the build instructions in the README file.

Also included in the samples directory is the [RXPTest app](/samples/RXPTest) which attempts to exercise all of the functionality of ReactXP. It is a good source to consult for sample usage of APIs, components, and props.

You can read more about ReactXP and its APIs from the [ReactXP official Documentation](https://microsoft.github.io/reactxp/docs/getting-started.html).


## `create-rx-app` is not supported ( no alternative is created yet ).
For the time being you can use the /samples/RXPTest app to copy and replace the src to create a new project.

Hopefully scaffolding will be supported in future. ( PR welcome )


### Prerequisites
* [Node.Js](https://nodejs.org/) ([Setup Instructions](https://nodejs.org/en/download/package-manager/))
* [React Native](https://facebook.github.io/react-native/) ([Setup Instructions](https://facebook.github.io/react-native/docs/getting-started))

## Contributing

We welcome contributions to ReactXP. See the [CONTRIBUTING](./CONTRIBUTING.md) file for how to help out.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
