# Simple Trello Clone Project

## How to run the project

1. Clone this repo
2. Enter the project root
3. Run `npm i` inside project root
4. If you want to run tests, use `npm test` (or to run tests with coverage report do `npm test -- --coverage`)
5. To run the development build of this project, use `npm start`
6. To build the project, use `npm build`

# Implemented features
- Adding of Columns
- Deleting Columns
- Editing Column Name
- Adding Tasks to Columns
- Deleting Tasks from Columns
- Editing Task Name
- Adding/Editing Task Notes
- Moving Tasks from One Column to Another
- Persisting Project Data using LocalStorage
- Mobile friendly-ish UI

# Features Wishlist
## Labelling Tasks

> **What would this feature do**
>
> The ability to add a label to a task would be a great feature to have as it would enable the user to further categorize tasks apart from the column names.
>
> **How it works**
>
> When the user clicks on a task to add/edit task notes, there would be an additional area at the bottom where they could add a label, or multiple labels separated by commas. They could then find/sort tasks according to their labels in the future.
>
> **UX considerations**
>
> We have to decide if the user would need the ability to assign a color to each label as that may help them with the visual aspect of task categories.

## Searching for a Task

> **What would this feature do**
>
> A search bar would allow the user to easily find tasks based on their search query, eliminating the need for them to visually scan and scroll throughout the entire application.
>
> **How it works**
>
> By clicking on the search bar, the user would be able to type any keyword(s) that they would like to search for inside tasks such as the task name, contents of task notes, or task labels (if implemented). Tasks would dynamically appear or disappear as the user types.
>
> **UX considerations**
>
> We should consider some filtering options such as "date" or "labels" as they would be useful for the user.

## Due Date for Tasks

> **What would this feature do**
>
> Enabling the user to add a due date to a task would be useful as it would allow them to prioritize certain tasks and manage time better.
>
> **How it works**
>
> The user would be able to add a due date at the "Due date" section by expanding a task. They would also be able to change the date format under "Settings and Preferences" under "Account".
>
> **UX considerations**
>
> The user would be informed when a due date is approaching by changing the task's color to yellow, and to red when the due date is even nearer. If a task is still undone past its due date, a mute gray color would be applied to it instead.

# Decisions I had to make (and what I would have done different)

## Where is Drag and Drop functionality?

To be honest, while I did have it in mind, I decided against it for two reasons:

1. Drag and drop functionality can be clunky on mobile if not implemented correctly
2. Drag and drop functionality is a bit of a pain to implement from scratch especially given the time constraints

Had this been a production grade project, I probably would have used the myriad of excellent libraries available for React like `react-dnd` or `react-beautiful-dnd`. I believe in the idea of not reinventing the wheel unnecessarily as it can waste time on a project (not to mention that that time is probably best spent elsewhere like writing better tests).

Of course, that doesn't mean I am against implementing Drag and Drop from scratch, especially if the functionality required is relatively simple. Given the necessary time within the project, I am confident that it is something capable of being done.

## What is that funky utility function `deepClone` all about?

I am a firm believer in the idea of immutability when working with objects/arrays. When I decided to implement all of my column and task logic handlers, I made the decision that I don't want to touch the column data being passed to the handlers themselves. Instead of installing something like `lodash` (and having to add another dependency to the project for one function), I took the naive approach and instead convert all objects/arrays into strings through `JSON.stringify` and then parsed it back to JSON using `JSON.parse`. This meant that not only am I making a new reference to the object/array I was passing, but that I was also deeply cloning all of the data inside of said object/array. In the end, I like this approach for its simplicity and maintainability

