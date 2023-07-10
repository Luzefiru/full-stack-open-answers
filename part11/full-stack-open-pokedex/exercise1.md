# Context

Think about a hypothetical situation where we have an application being worked on by a team of about 6 people. The application is in active development and will be released soon.

Let us assume that the application is coded with some other language than JavaScript/TypeScript, e.g. in Python, Java, or Ruby. You can freely pick the language. This might even be a language you do not know much yourself.

# Questions

### Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked?

There are multiple _npm_ packages that can be used to do these necessary processes. In a TypeScript React application, it would be beneficial to create an `.eslintrc` file that contains linting rules which is scanned everytime our IDE automatically lints the working directory or when we run `npx eslint <file>`. This will catch code style and other errors, like special TypeScript rules. For testing, a good library to use is Jest and React Testing Library. We can then run `npx jest` to test all the `.test.ts` files before we commit and merge into the main branch. For builds, a popular tool is webpack (together with Babel transpilation) so that we can minify and _tree-shake_ our code for more optimized builds.

### What alternatives are there to set up the CI besides Jenkins and GitHub Actions?

There are multiple tools, but I would like to highlight AWS CodePipine because it exposes developers to the AWS ecosystem and also GitLab CI because it is a frequently highlighted alternative to GitHub Actions with very similar features and because GitLab is another cloud platform for Version Control.

### Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

This setup would be better with a cloud-based environment because first of all, it is a web application and we would like to deploy our code and commit changes via GitHub remotely with nearly zero investment in any architecture. Furthermore, the team is relatively small and a couple scripts using a cloud-based environment should be sufficient for the application are building and the end user hardware we are targetting, which are web browsers.
