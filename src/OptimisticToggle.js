import React, { Component } from 'react';
import noop from 'lodash/noop';

class OptimisticToggleUtil extends Component {
  
  static defaultProps = {
    initialValue: false,
    action: noop,
  };

  currentPromise = null;
  failedCount = 0;

  state = {
    optimisticState: this.props.initialValue,
  };

  handleToggle = (event) => {
    const newToggled = !this.state.optimisticState;
    this.setState({
      optimisticState: newToggled,
    });

    const actionPromise = this.props.action(newToggled, event);

    this.currentPromise = actionPromise;

    actionPromise.catch((error) => {
      this.failedCount++;
      if (this.currentPromise === actionPromise) {
        this.setState((prevState) => ({
          optimisticState: this.failedCount % 2 === 0 ? prevState.optimisticState : !prevState.optimisticState,
        }), () => {
          this.failedCount = 0;
        });
      }
    });
  };

  render() {
    return this.props.children(this.state.optimisticState, this.handleToggle);
  }
}

export default OptimisticToggleUtil;
