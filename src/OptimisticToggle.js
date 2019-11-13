// @flow
import React, { Component, SyntheticEvent } from 'react';

const noop = () => {};

type Props = {
  /** Initial Value of the Checkbox */
  initialValue?: boolean,
  /** On-change handler that returns a Promise Object */
  action?: (toggleState: boolean, event: SyntheticEvent) => Promise<any>,
  /** UI Component that has been passed as children */
  children?: React.ReactNode,
};

type State = {
  optimisticState: boolean,
};

class OptimisticToggle extends Component<Props, State> {
  static defaultProps: Props = {
    initialValue: false,
    action: noop,
    children: noop,
  };

  currentPromise: ?Promise = null;
  failedCount = 0;

  state = {
    optimisticState: this.props.initialValue,
  };

  handleToggle = (event: SyntheticEvent) => {
    const newToggled = !this.state.optimisticState;
    this.setState({
      optimisticState: newToggled,
    });

    const actionPromise = this.props.action(newToggled, event);

    this.currentPromise = actionPromise;

    actionPromise.catch(error => {
      this.failedCount++;
      if (this.currentPromise === actionPromise) {
        this.setState(
          prevState => ({
            optimisticState: this.failedCount % 2 === 0 ? prevState.optimisticState : !prevState.optimisticState,
          }),
          () => {
            this.failedCount = 0;
          },
        );
      }
    });
  };

  render() {
    return this.props.children(this.state.optimisticState, this.handleToggle);
  }
}

export default OptimisticToggle;
