### Basic Usage

```jsx static
function action(toggledValue, event) {
  // must return a promise.
}

const [toggle, setToggle] = useOptimisticToggle({ initialValue, action });
```

### Working Example

```jsx
import useOptimisticToggle from './useOptimisticToggle.js';

function passingAction(toggledValue) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 400);
  })
}

function failingAction(toggledValue) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 400);
  })
}

function ExampleOptToggleHook({ action }) {
  const [toggle, setToggle] = useOptimisticToggle({ action });
  return (
    <input type="checkbox" checked={toggle} onChange={setToggle} />
  );
}

<section>
  <div>
    <h4>Optimistic Toggle where the promise returned by action fails</h4>
    <label>
      <ExampleOptToggleHook action={failingAction} />
      <span>After the 400ms the checkbox will get unchecked no matter how many times you check or uncheck it.</span>
    </label>
    <p>
      If you check or uncheck the checkbox that state will be reverted to the previous state after 400ms because the promise gets rejected.
    </p>
  </div>
  <div>
    <h4>Optimistic Toggle where the promise returned by action succeeds</h4>
    <label>
      <ExampleOptToggleHook action={passingAction} />
      <span>the checkbox will not get unchecked later.</span>
    </label>
    <p>
      When you first click the checkbox, action function is called and so the promise starts executing.
      Before it completes if the checkbox is clicked again then more promises will be queued.
      Because in this case all promises will resolve successfully whatever the last action was it will be persisted in checkbox state.
      So if atlast you unchecked the checkbox then the checkbox will remain unchecked.
    </p>
  </div>
</section>
```
