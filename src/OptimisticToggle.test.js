import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { SynchronousPromise } from 'synchronous-promise';

import OptimisticToggle from './OptimisticToggle';

configure({ adapter: new Adapter() });


describe('Test <OptimisticToggle />', () => {
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
      <OptimisticToggle action={action}>
        {(toggle, setToggle) => <input type="checkbox" checked={toggle} onChange={setToggle} />}
      </OptimisticToggle>,
    );
  });

  afterEach(() => {
    promise = null;
  });

  it('stay checked when action succeeds', () => {
    expect(wrapper.prop('checked')).toEqual(false);
    wrapper.simulate('change');
    expect(wrapper.prop('checked')).toEqual(true);
    promise.resolve();
    wrapper.update();
    expect(wrapper.prop('checked')).toEqual(true);
  });

  it('revert checked when action fails', () => {
    expect(wrapper.prop('checked')).toEqual(false);
    wrapper.simulate('change');
    expect(wrapper.prop('checked')).toEqual(true);
    promise.reject();
    wrapper.update();
    expect(wrapper.prop('checked')).toEqual(false);
  });

  it('Works for Race Condition: o Ap x Bp o Br x Ars x', () => {
    wrapper.simulate('change');
    const promiseA = promise;
    expect(wrapper.prop('checked')).toEqual(true);

    wrapper.simulate('change');
    const promiseB = promise;
    expect(wrapper.prop('checked')).toEqual(false);

    promiseB.reject();
    wrapper.update();
    expect(wrapper.prop('checked')).toEqual(true);

    promiseA.resolve();
    wrapper.update();
    expect(wrapper.prop('checked')).toEqual(true);
  });

  it('Works for Race Condition: o Ap x Bp o Cp x Br x Cr x Ars x', () => {
    wrapper.simulate('change');
    const promiseA = promise;
    expect(wrapper.prop('checked')).toEqual(true);

    wrapper.simulate('change');
    const promiseB = promise;
    expect(wrapper.prop('checked')).toEqual(false);

    wrapper.simulate('change');
    const promiseC = promise;
    expect(wrapper.prop('checked')).toEqual(true);

    promiseB.reject();
    wrapper.update();
    expect(wrapper.prop('checked')).toEqual(true);

    promiseC.reject();
    wrapper.update();
    expect(wrapper.prop('checked')).toEqual(true);

    promiseA.resolve();
    wrapper.update();
    expect(wrapper.prop('checked')).toEqual(true);
  });
});
