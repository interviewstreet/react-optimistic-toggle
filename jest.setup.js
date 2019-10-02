import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { SynchronousPromise } from 'synchronous-promise';

configure({ adapter: new Adapter() });

global.shallow = shallow;
