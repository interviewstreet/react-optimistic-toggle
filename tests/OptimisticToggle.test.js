import React from 'react';
import { shallow } from 'enzyme';
import { SynchronousPromise } from 'synchronous-promise';

import OptimisticToggleUtil from '../../src/react/optimistic_toggle_util';

import 'test-util/test_setup';

describe('Test OptimisticToggleUtil', () => {
  /**
   * Ap: promiseA pending
   * Ar: promiseA rejected
   * Ars: promiseA resolved
   *
   * o: unchecked
   * x: checked
   */
  let wrapper, promise;
  beforeEach(() => {
    const action = () => {
      // promise will be overwritten everytime we simulate click
      promise = SynchronousPromise.unresolved();
      return promise;
    };

    wrapper = shallow(
      <OptimisticToggleUtil action={action}>
        {(toggle, setToggle) => <input type="checkbox" checked={toggle} onClick={setToggle} />}
      </OptimisticToggleUtil>,
    );
  });

  afterEach(() => {
    promise = null;
  });

  it('stay checked when action succeeds', () => {
    expect(wrapper.prop('checked')).to.equal(false);
    wrapper.simulate('click');
    expect(wrapper.prop('checked')).to.equal(true);
    promise.resolve();
    wrapper.update();
    expect(wrapper.prop('checked')).to.equal(true);
  });

  it('revert checked when action fails', () => {
    expect(wrapper.prop('checked')).to.equal(false);
    wrapper.simulate('click');
    expect(wrapper.prop('checked')).to.equal(true);
    promise.reject();
    wrapper.update();
    expect(wrapper.prop('checked')).to.equal(false);
  });

  it('Works for Race Condition: o Ap x Bp o Br x Ars x', () => {
    wrapper.simulate('click');
    const promiseA = promise;
    expect(wrapper.prop('checked')).to.equal(true);

    wrapper.simulate('click');
    const promiseB = promise;
    expect(wrapper.prop('checked')).to.equal(false);

    promiseB.reject();
    wrapper.update();
    expect(wrapper.prop('checked')).to.equal(true);

    promiseA.resolve();
    wrapper.update();
    expect(wrapper.prop('checked')).to.equal(true);
  });

  it('Works for Race Condition: o Ap x Bp o Cp x Br x Cr x Ars x', () => {
    wrapper.simulate('click');
    const promiseA = promise;
    expect(wrapper.prop('checked')).to.equal(true);

    wrapper.simulate('click');
    const promiseB = promise;
    expect(wrapper.prop('checked')).to.equal(false);

    wrapper.simulate('click');
    const promiseC = promise;
    expect(wrapper.prop('checked')).to.equal(true);

    promiseB.reject();
    wrapper.update();
    expect(wrapper.prop('checked')).to.equal(true);

    promiseC.reject();
    wrapper.update();
    expect(wrapper.prop('checked')).to.equal(true);

    promiseA.resolve();
    wrapper.update();
    expect(wrapper.prop('checked')).to.equal(true);
  });
});
