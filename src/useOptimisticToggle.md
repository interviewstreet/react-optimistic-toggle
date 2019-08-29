### Basic Usage

```jsx
import useOptimisticToggle from './useOptimisticToggle.js';

function action(toggledValue) {
  console.log('toggledValue', toggledValue); // aditodo remove this

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 400);
  })
}

function ExampleOptToggleHook() {
  const [toggle, setToggle] = useOptimisticToggle({ action });
  return (
    <input type="checkbox" checked={toggle} onChange={setToggle} />
  );
}

<section>
  <div>
    <ExampleOptToggleHook />
    <span>React Hook</span>
  </div>
</section>
```
