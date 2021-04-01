# Let's Learn React Hooks :star_struck:

## Summary :books:

React functional components are a great way to simplify your React code, however understanding how to add state, effects, and context to your functional components with hooks can be confusing.

Throughout this talk we'll expore the React Hooks API by building a simple timer component. We'll use Vite to run the app, VS Code as the editor, Google Chrome for the browser, and the React Devtools Extension to help with debugging.


## Housekeeping :house_with_garden:

### Who am I?
I'm [Mark Bennett](markbennett.ca), a developer and president of [Burmis Studio](burmis.ca). I've been building React and Ruby on Rails apps for a long time, and love running, cooking and playing with my kids.

### Who Are You?

This talk is meant for new and experienced React developers looking to better understand the Hooks API, how to use them effectively, and how to avoid some common problems.

### What Should You Know?
* HTML, JavaScript, JSX
* ES6 import / export
* Basic React experience

### Questions
I'll pause regularly through this talk to take questions from the moderators, then they'll be time for questions at the end of the talk.

### Source Code
You can get all the source code for this talk from my GitHub at:

    https://github.com/MarkBennett/lets-learn-react-hooks

### Following Along
If you want to follow along, just checkout the source code then run:

    yarn install
    yarn run dev

Once `vite` starts up you can open up your browser to:

    http://localhost:3000/

Vite supports super fast HMR so you can just edit the files you're working on to see it update in your browser.

### What's Not Included
  * NOT using TypeScript (use it though, it's great!)
  * NOT describing [Vite](https://vitejs.dev/)
    * fast reloading and start up by skipping bundling
    * can do another talk if there's interest
  * NOT comparing each hook with class components equivalent
  * NOT going to spend time on CSS or styling
  * NOT going to test this hooks we write today
    
### Terms & Reminders
<dl>
  <dt>JavaScript Closure</dt>
  <dd>When you create a function in JavaScript it closes over ("remembers") the variables and functions that were in scope when it was defined so they can be used by the function when it's called later, even if they're no longer in scope or accessible. Closures in JavaScript are created whenever a function is defined.
  
  <pre>
function buildAFunctionWithAClosure() {
    // This variable is hidden by the closure
    const hiddenVariable = "Can't access me directly!";

    // Return a function that closes over the values in this closure
    return function whatsMyValue() {
        console.log(`HIDDEN VALUES! --> '${hiddenVariable}'`);
    };
}

const functionWithAClosure = buildAFunctionWithAClosure();
functionWithAClosure(); // "HIDDEN VALUES --> 'Can't access me directly'"
  </pre>
  </dd>

  <dt>React Render Lifecycle</dt>
  <dd><p>React has two important jobs: <b>rendering</b> the Virtual DOM, and <b>committing</b> the Virtual DOM to the real DOM in the browser. React will render your functional component when it chooses, and then commit the rendered virtual DOM to the real DOM at some point after that.
  
  <p>Assume you won't know when or how often your component will render or when the virtual DOM will be committed to the real DOM.</dd>

  <dt>Pure Function</dt>
  <dd>A function is pure if always returns identical outputs when given identical inputs, and when it has no side effects (changes to values outside the function)</dd>

  <dt>React Functional Components</dt>
  <dd>A standard JavaScript function which accepts a list of React properties as it's arguments, and returns a string, object that is a subclass of <code>React.Component</code>, or a plain function. Usually, you use <code>JSX</code> to generate the returned component</dd>
</dl>

## What Are Hooks?

React Hooks allow you to integrate impure behaviours like state, context and side effects into functional components.

> React Hooks aren't meant to be used from class components. Use `this.state` and `React.Component` lifecycle methods instead.

React Hooks are just standard JavaScript functions you call from inside your functional component. They accept arguments when you call them, and return values you can use in your function. By convention their names all start with `use`. 

There are three hooks you'll use a lot:

* `useState()`
* `useEffect()`
* `useContext()`

Two you'll use a little:

* `useRef()`
* `useReducer()`

And five you won't use much but are good to understand:

* `useCallback()`
* `useMemo()`
* `useImperitiveHandle()`
* `useLayoutEffect()`
* `useDebugValue()`

## Using Hooks

To understand how to use hooks we're going to build a simple timer component. As we build it up, we'll explore the different hooks and how we might use them.

> This timer is meant to be an example we can use to try out the different React Hooks. We'll do some things just to demonstrate the hooks, but you'd likely implement it differently in a real application.

You can see the final working component in `/src/compoments/FinalTimer.js`. Open the app in your browser and take a moment to play with it.

> You can use the "Render Again" button to trigger a re-render in `App.jsx`. We'll explain how we're using `useState()` to trigger a re-render later.

## 1. Rendering A Pure Component

1. Open `/src/components/Timer.jsx`
1. Export a function called `Timer` that takes a single prop called `intialTime`
1. Note that this compoment has no state and always renders the same 

## 2. Basic state with useState

We're going to add state to our component using the `useState` hook. Initially, the state is set to `initialTime`.

In `Timer.jsx` add:

    const [time, setTime] = useState(initialTime);

    return <div>
        { time } Seconds
    </div>

1. `useState()` takes in an initial state. It returns the current state, and a setter function to modify it.
1. The setter function accepts either a value, or a function
1. The function passed to the setter is called to set the new state from the current one. The current state is passed as a parameter

    setState((currentState) => newState)

1. When you set the state, it replaces the old state. Values aren't merged like `this.setState()`.
1. Unlike with components, there isn't one "state" you use for your whole component, so you can call `useState()` many times in one render to create multiple states.

Let's add a button we can click to increase the count.

    <button onClick={() => setTime(time + 1)}>+1<button>

Notice that each time we call this function to render the component we're creating a new `onClick` handler function. This function closes over the current `time`.

We can add a few `console.logs` to our `Timer` function to see this in action:

    console.log("Rendering the Timer");
    const [time, setTime] = useState(Number.parseInt(initialTime,10));

    console.log(`time = ${time}`);

## 3. Handling side effects with useEffect

Our timer isn't very interesting yet, as it only advances when you click the button. Let's use an effect to update the timer each second.

Effects are any imperitive, impure, possible effective code, like network requests, timers, and other mutations which impact the environment the application runs in.

The `useEffect()` hook let's you register code to run after React has committed the current render to the screen. This avoids issues with blocking rendering, and allows you to access the DOM and other resources from your effect.

### Effects On Each Render

By default any function passed to the `useEffect()` function is called after your component is rendered and committed. Let's try!

    useEffect(() => {
        console.log(`The Timer is committed`);

        return () => {
            console.log(`The Timer is about to be cleaned up`)
        }
    });

If you re-render the Timer then in the console you can see:

    The Timer is committed
    The Timer is about to be cleaned up
    The Timer is committed

The function passed into `useEffect()` is called each time we render. This function also returns a clean up function which is called to clean up the effects before the virtual DOM is disposed between renders. The clean up function is optional.

### Effects Only When A Value Changes

Often effects can be expensive (like a network request), or time dependent so you don't want to call them on each render. To avoid this, `useEffect()` accepts a second argument which is a list of dependencies that React uses to determine if the effect needs to run again.

    useEffect(() ==> ..., [dep1, dep2, dep3])

> When comparing dependencies React does a shallow comparison using the `Object.is` algorithm.

If the effect has already run then the effect from the previous render will be cleaned up before this effect runs again.

### Effects On Mount & Unmount

If you only want the effect (and clean up) to run once per component, then you can specify an empty dependency array. This will never change so React will never run your effect or clean up more than once.

We'll use this to set an interval timer in our component.

First remove effect we already created, and replace it with one to set an interval that runs every second. We'll also return a clean up function that clears the interval. Since we don't want the interval resetting after each render, we'll include an empty dependency array.

    useEffect(() => {
        console.log("Setting interval");
        const timerId = setInterval(() => {
            console.log("TICK");
        }, 1000);

        return () => {
            console.log("Clearing interval");
            clearInterval(timerId);
        }
    }, [])

You should see the "TICK" piling up in the console.

Now change the effect to increment the count.

handling effects that depend on a callback tied to this closure
handling effects that don’t complete within a single render
Sharing state between components with useContext / useReducer

## 3. Stale State & Properties

One of the most confusing things you'll find with 
One of the most important things to understand with 
When you  is tied to the closure and changes with each render
stale setters from past closures won't continue to work
you can call useState multiple times
setState doesn't merge like this.setState
Sharing values between renders with useRef
comparing with previous state using a ref

## Creating and sharing code with hooks
* Keep hooks simple
* Keep your hooks pure, or
* Make dependencies obvious

## Rules of hooks

## Testing components with hooks
When, and when not, to optimise with useCallback and useMemo
Passing callbacks as deps
Expensive to render components
Profile then optimize
Other hooks
useImperitiveHandle
useLayoutEffect
useDebugValue
When you need to use a class
Error boundaries
Common Questions
setState from a previous closure doesn’t work
how does React compare the parameter array
Object.is
deps warnings
what's the difference between useEffect() without a second parameter and just calling code every time your component renders

## Resources :moneybag:
* [React Hooks API](https://reactjs.org/docs/hooks-reference.html)
* [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html)
* [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
* [React Testing Recipes](https://reactjs.org/docs/testing-recipes.html)
* [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
* [React Devtools](https://github.com/facebook/react/tree/master/packages/react-devtools) & [Profiling](https://kentcdodds.com/blog/profile-a-react-app-for-performance)

## Community & Getting Help :mag:
* [Dev Edmoonton Slack](https://devedmonton.com)
* [Stack Overflow React Hooks Tag](https://stackoverflow.com/questions/tagged/react-hooks)
* [React Support Communities](https://reactjs.org/community/support.html)

## Next Steps :construction_worker:

## Thanks & Acknowledgements