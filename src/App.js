import React from 'react';
import {observer} from 'mobx-react';

@observer
class App extends React.Component {
  state = { lazyComponent: null };

  async componentDidMount() {
    const {default: Component} = await import('./LazyComponent');
    this.setState({
      lazyComponent: <Component />,
    });
  }

  render() {
    return (<div>
      <h4>App here!</h4>
      {this.state.lazyComponent || <h5>loading...</h5>}
    </div>)
  }
}

export default App;
