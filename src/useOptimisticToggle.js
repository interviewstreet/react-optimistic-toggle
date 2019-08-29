import { useState, useRef } from 'react';

const noop = () => {};

function useOptimisticToggle({ initialValue = false, action = noop }) {
  const [stateOptimistic, setStateOptimistic] = useState(initialValue);
  const refCurrentPromise = useRef();
  const refFailedCount = useRef(0);

  function handleToggle(event) {
    const newToggled = !stateOptimistic;
    setStateOptimistic(newToggled);

    const actionPromise = action(newToggled, event);

    refCurrentPromise.current = actionPromise;

    actionPromise.catch(() => {
      refFailedCount.current += 1;
      if (refCurrentPromise.current === actionPromise) {
        setStateOptimistic(prevState => {
          return refFailedCount.current % 2 === 0 ? prevState : !prevState;
        });
        refFailedCount.current = 0;
      }
    });
  }

  return [stateOptimistic, handleToggle];
}

export default useOptimisticToggle;
