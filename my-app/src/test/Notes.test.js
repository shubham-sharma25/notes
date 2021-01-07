import { shallow } from 'enzyme';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from 'react-redux';
import Notes from '../components/Notes';
import { initialState } from '../redux/state';
import store from '../redux/store';

configure({ adapter: new Adapter() });

const props = initialState;
describe("Notes component ", () => {
    test("should display a login form", () => {
        let wrapper = shallow(
            <Provider store={store}>
                <Notes {...props} />
            </Provider>
        )
        expect(wrapper.find("form")).toBeDefined();
    });
});