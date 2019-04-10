import register from 'ignore-styles';
register(['.css', '.scss', '.sass']);
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter()
});
