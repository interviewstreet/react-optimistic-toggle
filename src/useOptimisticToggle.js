import { useState, useRef, SyntheticEvent } from 'react';

const noop = () => {};

type Props = {
  /** Initial Value of the Checkbox */
  initialValue?: boolean,
  /** On-change handler that returns a Promise Object */
  action?: (toggleState: boolean, event: SyntheticEvent) => Promise<any>,
};

function useOptimisticToggle({ initialValue = false, action = noop }: Props) {
  const [stateOptimistic, setStateOptimistic] = useState(initialValue);
  const refCurrentPromise = useRef();
  const refFailedCount = useRef(0);

  function handleToggle(event: SyntheticEvent) {
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
