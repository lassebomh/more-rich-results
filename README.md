# More Rich Results <img src="src/assets/images/icon_64.png" width="28">

This extension adds Stack Overflow and Reddit previews to the Google search page (among others).

It works by requesting public (and official) APIs when the link to a search result matches an implemented result preview. It makes no outbound requests other than these and is written in a simple fashion that makes it easy to extend.

![Previews](https://i.imgur.com/4TDJHjQ.png)

## Features

#### Result Previews
 - Reddit
 - Stack Exchange solutions (Stack Overflow, Server Fault, Ask Ubuntu, ...)

#### Supported search engines
 - Google
 - DuckDuckGo
 - Startpage
 - Searx (experimental - only works on searx.tiekoetter.com)
 
#### Other features
 - Expandable comments in Reddit
 - Comments in Reddit are hidden/displayed based on its upvotes compared to the post.
 - The main content of Stack Exchange questions are hidden by default because it's often skipped entirely.

## Features in consideration
 - Remove `$` from bash snippets
 - Add button to run JS code
 - Add copy button to code snippets
 - Settings page to toggle features
 
 Suggestions and pull requests are welcome!
