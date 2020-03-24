import React from 'react';
import { Provider } from 'react-redux';
import store from 'src/redux/store';
import ThemeProvider from 'styles/themeProvider';
import Header from 'components/Header';
import DictList from 'components/DictList';
import { mount } from 'enzyme';
import Overview from './Overview';

describe('Screen: Overview', () => {
  it('Should render Header and DictList', () => {
    const component = mount(
      <Provider store={store}>
        <ThemeProvider>
          <Overview />
        </ThemeProvider>
      </Provider>,
    );

    expect(component.find(Header)).toHaveLength(1);
    expect(component.find(DictList)).toHaveLength(1);
  });
});
