# Media Bundle contribution guidelines

First of all, thank you for your interest in contributing to the Media Bundle! We welcome all contributions from the community to help improve the project.

## New contributor guide

Make sure that you have read our [Code of Conduct](CODE_OF_CONDUCT.md) and that you agree with it. All the contributions to this project are governed by this code of conduct and must adhere to the project [license](LICENSE.md) (MIT).

All the contributions to this project must be made through pull requests and written in English.

## Reporting bugs

If you find a bug in the Media Bundle, please

1. [Check the issue tracker](https://github.com/jolicode/MediaBundle/issues?q=is%3Aissue) to see if the issue has already been reported. If it has, you can add any additional information or context that may be helpful.
2. If the issue has not been reported yet, please [report it by creating a new issue](https://github.com/jolicode/MediaBundle/issues/new). Please provide as much detail as possible, including steps to reproduce the issue, expected behavior, and any relevant error messages or logs.

## Suggesting enhancements

If you have an idea for a new feature or enhancement for the Media Bundle, please [open a new issue](https://github.com/jolicode/MediaBundle/issues/new) to discuss it. Please provide as much detail as possible about the feature or enhancement you are suggesting, including any relevant use cases or examples. This will allow us to better understand your feature suggestion and determine how to prioritize it.

## Pull requests

If you would like to contribute code to the Media Bundle, please follow these steps:

1. [Fork the repository](https://github.com/jolicode/MediaBundle/fork)
2. Create a new branch for your feature or bug fix
3. Make your changes and commit them with clear and descriptive commit messages
4. Make sure [docs](#update-the-documentation) are up-to-date
5. Push your changes to your forked repository
6. Make sure [tests](#tests), [coding standards](#coding-standards) checks and [static analysis](#static-analysis) checks are up-to-date and green
7. [Open a pull request](https://help.github.com/articles/creating-a-pull-request) against the `main` branch of the original repository

## Coding standards

Coding standards can be checked using PHP CS Fixer. To check and fix coding standards issues, run the following command:

```bash
castor qa:all
```

## Update the Documentation

When introducing new features or changing existing ones, please make sure to update the documentation accordingly. The documentation is located in the `doc/` directory of the repository.
