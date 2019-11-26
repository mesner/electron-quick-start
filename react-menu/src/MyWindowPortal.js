import React from 'react';
import ReactDOM from 'react-dom';

export default class MyWindowPortal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.name = props.name || '';

    this.url = props.url;

    this.bounds = {
      top: this.props.top || 0,
      left: this.props.left || 0,
      width: this.props.width || 600,
      height: this.props.height || 400
    };


    // STEP 1: create a container <div>
    this.containerEl = document.createElement('div');
    this.externalWindow = null;
  }

  render() {
    // STEP 2: append props.children to the container <div> that isn't mounted anywhere yet
    return ReactDOM.createPortal(this.props.children, this.containerEl);
  }

  componentDidMount() {
    // STEP 3: open a new browser window and store a reference to it
    this.externalWindow = window.open('', '', `width=${this.bounds.width},height=${this.bounds.height},left=${this.bounds.left},top=${this.bounds.top}`);

    // STEP 4: append the container <div> (that has props.children appended to it) to the body of the new window
    this.externalWindow.document.body.appendChild(this.containerEl);
  }

  componentWillUnmount() {
    // STEP 5: This will fire when this.state.showWindowPortal in the parent component becomes false
    // So we tidy up by closing the window

    this.externalWindow.close();
  }
}