### Basic Usage

```jsx
function action(toggledValue) {
  console.log('toggledValue', toggledValue); // aditodo remove this

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject();
    }, 400);
  })
}

function ExampleOptToggleRenderProp() {
  return (
    <OptimisticToggle action={action}>
      {(toggle, setToggle) => <input type="checkbox" checked={toggle} onChange={setToggle} />}
    </OptimisticToggle>
  );
}

<section>
  <div>
    <ExampleOptToggleRenderProp />
    <span>This toggle will get checked when you click and then after 400ms due to promise failing it will get unchecked. Even if you click multiple times between the 400ms period, the checkbox will get checked / unchecked at that time. But after 400ms it will get unchecked only</span>
  </div>
</section>
```
