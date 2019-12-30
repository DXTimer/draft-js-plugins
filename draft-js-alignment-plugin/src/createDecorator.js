import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const getDisplayName = (WrappedComponent) => {
  const component = WrappedComponent.WrappedComponent || WrappedComponent;
  return component.displayName || component.name || 'Component';
};

export default ({ store }) => (WrappedComponent) => class BlockAlignmentDecorator extends Component {
  static displayName = `BlockDraggable(Image)`;
  static WrappedComponent = WrappedComponent.WrappedComponent || WrappedComponent;

  state = {
    isMounted: true
  }

  componentDidMount = () => {
    this.setState({ isMounted: true });
  }

  componentDidUpdate = () => {
    const screenSizeCompatible = window && window.innerWidth >= 1440;
    if (this.props.blockProps.isFocused && this.props.blockProps.isCollapsedSelection && screenSizeCompatible) {
      // TODO figure out if and how to achieve this without fetching the DOM node
      // eslint-disable-next-line react/no-find-dom-node
      const blockNode = ReactDOM.findDOMNode(this);
      const boundingRect = blockNode.getBoundingClientRect();
      store.updateItem('setAlignment', this.props.blockProps.setAlignment);
      store.updateItem('alignment', this.props.blockProps.alignment);
      store.updateItem('boundingRect', boundingRect);
      store.updateItem('visibleBlock', this.props.block.getKey());
    // Only set visibleBlock to null in case it's the current one. This is important
    // in case the focus directly switches from one block to the other. Then the
    // Alignment tool should not be hidden, but just moved.
    } else if (store.getItem('visibleBlock') === this.props.block.getKey()) {
      store.updateItem('visibleBlock', null);
    }
  }

  componentWillUnmount() {
    // Set visibleBlock to null if the block is deleted
    this.setState({ isMounted: false });
    store.updateItem('visibleBlock', null);
  }

  render() {
    const {
      blockProps,
      style,
      // using destructuring to make sure unused props are not passed down to the block
      ...elementProps
    } = this.props;
    const alignment = blockProps.alignment;
    // let newStyle = style;
    // if (alignment === 'left') {
    //   newStyle = { ...style, float: 'left' };
    // } else if (alignment === 'right') {
    //   newStyle = { ...style, float: 'right' };
    // } else if (alignment === 'center') {
    //   newStyle = { ...style, marginLeft: 'auto', marginRight: 'auto', display: 'block' };
    // }

    return (
      <WrappedComponent
        {...elementProps}
        blockProps={blockProps}
        // style={newStyle}
        className={`alignment--${alignment}`}
      />
    );
  }
};
