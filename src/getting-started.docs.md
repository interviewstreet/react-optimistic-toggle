## Introduction

Optimistic UIs are all around us. Ever clicked the Twitter Like Button? It instantly turns red to show you that the webapp has registered your click. Due to such **optimistic micro-interactions the whole web-app feels blazing fast**. It is crucial for the app to respond quickly to user interactions.

For some interactions like posting a tweet or following a person, showing a loader is enough. But for small actions such as liking a Tweet, adding an item to Favorites, an **Optimistic Toggle** offers the ideal UX. But implementing such a component is more difficult than you think.

> Hint- Imagine what happens when user rapidly clicks the button multiple times and some API requests fails and some do not.

You don't have to worry though because the best Optimistic Toggle out there is just an `npm install` away. You can use it as a **React custom hook** or a **render prop**.

## Installation

```bash
npm install react-optimistic-toggle
```
