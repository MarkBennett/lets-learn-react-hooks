# Let's Learn React Hooks :star_struck:

## Summary
React functional components are a great way to simplify your React code, however understanding how to add state, effects, and context to your functional components with hooks can be confusing. Let's figure that you!

### Housekeeping

### Who am I?
I'm [Mark Bennett](markbennett.ca), a developer and president of [Burmis Studio](burmis.ca). I've been building React and Ruby on Rails apps for a long time, and love running, cooking and playing with my kids.

### Prerequisites
* HTML, JavaScript
* import / export

### Questions
I'll pause regularly through this talk to take questions from the moderators, then they'll be time for questions at the end of the talk.

### Source Code
You can get all the source code for this talk from my GitHub at:

    https://github.com

### What's Not Included
  * NOT using TypeScript (but it's recommended)
  * NOT describing [Vite](https://vitejs.dev/)
    * fast reloading and start up by skipping bundling
    * can do another talk if there's interest
  * NOT comparing each hook with class components equivalent
    
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
  <dd>React has two important jobs: rendering the Virtual DOM, and committing the Virtual DOM to the real DOM in the browser. React will render your functional component when it chooses, and then commit the rendered virtual DOM to the real DOM at some point after that. Assume you won't know when or how often your component will render or when the virtual DOM will be committed to the real DOM.</dd>

  <dt>Pure Function</dt>
  <dd>A function is pure if always returns identical outputs when given identical inputs, and when it has no side effects (changes to values outside the function)</dd>

  <dt>React Functional Components</dt>
  <dd></dd>
</dl>

What are hooks and how do they work?
How do they work?
Rules of hooks
Basic state with useState
setter is tied to the closure and changes with each render
stale setters from past closures won't continue to work
you can call useState multiple times
setState doesn't merge like this.setState
Sharing values between renders with useRef
comparing with previous state using a ref
Handling side effects with useEffect
Each render
Mount / unmount
Only when specific deps change
handling effects that depend on a callback tied to this closure
handling effects that don’t complete within a single render
Sharing state between components with useContext / useReducer
Creating and sharing code with hooks
Keep hooks simple
Keep your hooks pure, or
Make dependencies obvious
Best practices and anti-patterns
Testing components with hooks
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
Next Steps
React Hooks FAQ
React Testing Recipes
Use eslint with react-hooks plugin
Devtools Profiling
Thanks & Acknowledgements