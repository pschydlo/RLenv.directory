# Contributing to RLenv.directory

:tada: First off, thanks for taking the time to contribute! :tada:

We've created this guideline to get you started as fast and painless (contributing is fun!) as possible!

## Table Of Contents

[I just want to ask question](#i-just-want-to-ask-question)

[How can I contribute?](#how-can-i-contribute)
  * [Submitting new environments](#submitting-new-environments)
  * [Tagging existing environments](#tagging-existing-environments)
  * [Submitting feature requests](#submitting-feature-requests)
  * [Contributing to the core code](#contributing-to-the-core-code)
  * [Running the platform locally](#running-the-platform-locally)

## I just want to ask question

Great! Questions are important! 

You have different options for reaching us depending on the nature of your question:
- Quick questions: feel free to drop in to the [official discord server](https://discord.gg/feTGe2y) (as a guest or with an account) and ask away!
- Feature requests: Please check out our section on [Submitting feature requests](#submitting-feature-requests) 

## How can I contribute?
All hands are welcome, let's create this awesome platform together, from the community for the community!

Don't want to get your hands dirty and mess with the core code? No problem at all! There are lot's of small and big jobs for everyone!

### Submitting new environments
Found or created a cool new environment! Heck yeah, the more the merrier! Add your new found gem with the following steps:

1. Fork the repository
2. Add the environment to `site/data/envs.json`
3. Open a pull request

The format for any environment is:
```
{
    "name": "{Name}",
    "url": "{Github repository URL}",
    "short_descr": "{One word description}",
    "long_descr": "{One sentence description}",
    "stars": {Number of stars at the moment of submission, this field is updated periodically by a script},
    "num_agents": {Number of simultanously interacting agents the environments supports},
    "complexity": "{Difficulty of the environment: low, medium or high}",
    "tags": [
        "{List of tags which make the environment searchable on the platform}"
    ]
}
```

### Tagging existing environments

Every environment has a list of tags which allow it to be found. At the moment the environments have very few tags which makes their exploration a bit harder.

If you have a minute to spare it would be nice if you could give a look a the list of environments at `site/data/envs.json` and add any tags you feel are appropriate for the environmens!

### Submitting feature requests

This platform can only grow and thrive if we hear your cool ideas about how we can best explore the environments!
You think it would be nice to visualize the distribution of Github stars in the repositories or create anetwork of contributors who are maintaining them?

The sky is not the limit, let your creativity flow into a feature request!

To submit a feature request please [open an issue](https://github.com/pschydlo/RLenv.directory/issues) and be as detailed as possible about your ideas (you can even use that little sketch book of yours and send us a drawing :) )

### Contributing to the core code

Are you a frontend wizzard looking for a project to test the limits of client side processing? You have come to the right place! 

Due to the limits of static file hosting on Github all the data is stored in static JSON files in `site/data/envs.json` and then manipulated and searched through our React frontend.

We are always looking for ideas on how to make the frontend code more scalable and give the community new ways of exploring environments! 

If you are interested in contributing to the core code we have some issues tagged with help-wanted which let you jump right in!

## Running the platform locally

We know you are ready to dig in and make this the front end application of the century (we are loving your enthusiasm!) and dig into the code, So here are the steps you were looking for to get started:

1. Install [NPM](https://www.npmjs.com/get-npm)
2. Run `ǹpm install` in the `/site` folder to get those dependencies installed.
3. Install [Webpack](https://webpack.js.org/guides/installation/) (needed for .jsx and JS bundling)
4. Install [Jekyll](https://jekyllrb.com/docs/installation/)
5. Run `webpack -w` in the `/site` folder, this watches the .jsx files for changes and transpiles them when necessary.
6. Open a new terminal, navigate to the `/site` folder and run `jekyll serve -l`, this serves the platform with auto-reloading enabled
