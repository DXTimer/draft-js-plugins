/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import DraftOffsetKey from 'draft-js/lib/DraftOffsetKey';
import {
  HeadlineOneButton,
  HeadlineTwoButton,
  BlockquoteButton,
  CodeBlockButton,
  UnorderedListButton,
  OrderedListButton,
} from 'draft-js-buttons';
import BlockTypeSelect from '../BlockTypeSelect';

class Toolbar extends React.Component {
  static defaultProps = {
    children: externalProps => (
      <div>
        <HeadlineOneButton
          onMouseDown={externalProps.onClick}
          {...externalProps}
        />
        <HeadlineTwoButton
          onMouseDown={externalProps.onClick}
          {...externalProps}
        />
        <BlockquoteButton
          onMouseDown={externalProps.onClick}
          {...externalProps}
        />
        <CodeBlockButton
          onMouseDown={externalProps.onClick}
          {...externalProps}
        />
        <UnorderedListButton
          onMouseDown={externalProps.onClick}
          {...externalProps}
        />
        <OrderedListButton
          onMouseDown={externalProps.onClick}
          {...externalProps}
        />
      </div>
    ),
  };

  state = {
    position: {
      transform: 'scale(0)',
    },
    isExpanded: false,
  };

  componentDidMount() {
    this.props.store.subscribeToItem('editorState', this.onEditorStateChange);
  }

  componentWillUnmount() {
    this.props.store.unsubscribeFromItem(
      'editorState',
      this.onEditorStateChange
    );
  }

  onEditorStateChange = editorState => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    if (!selection.getHasFocus() || currentBlock.getLength() !== 0) {
      this.setState({
        position: {
          transform: 'scale(0)',
        },
        isExpanded: false,
      });
      return;
    }

    // TODO verify that always a key-0-0 exists
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    // Note: need to wait on tick to make sure the DOM node has been create by Draft.js
    setTimeout(() => {
      const node = document.querySelectorAll(
        `[data-offset-key="${offsetKey}"]`
      )[0];

      // The editor root should be two levels above the node from
      // `getEditorRef`. In case this changes in the future, we
      // attempt to find the node dynamically by traversing upwards.
      const editorRef = this.props.store.getItem('getEditorRef')();
      if (!editorRef || currentBlock.getLength() !== 0) {
        return;
      }
      this.setState({ isExpanded: false });

      // this keeps backwards-compatibility with react 15
      let editorRoot =
        editorRef.refs && editorRef.refs.editor
          ? editorRef.refs.editor
          : editorRef.editor;
      while (editorRoot.className.indexOf('DraftEditor-root') === -1) {
        editorRoot = editorRoot.parentNode;
      }

      const position = {
        top: node.offsetTop + editorRoot.offsetTop - 6,
        transform: 'scale(1)',
        // transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
        transition: 'all .2s ease',
      };
      // TODO: remove the hard code(width for the hover element)
      if (this.props.position === 'right') {
        // eslint-disable-next-line no-mixed-operators
        position.left =
          editorRoot.offsetLeft + editorRoot.offsetWidth + 80 - 36;
      } else {
        position.left = editorRoot.offsetLeft - 64;
      }

      this.setState({
        position,
      });
    }, 0);
  };

  handleBlockExpand = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  };

  render() {
    const { theme, store } = this.props;
    const { isExpanded } = this.state;

    return (
      <div className={theme.toolbarStyles.wrapper} style={this.state.position}>
        <BlockTypeSelect
          getEditorState={store.getItem('getEditorState')}
          setEditorState={store.getItem('setEditorState')}
          isExpanded={isExpanded}
          onExpand={this.handleBlockExpand}
          theme={theme}
        >
          {this.props.children}
        </BlockTypeSelect>
      </div>
    );
  }
}

Toolbar.propTypes = {
  children: PropTypes.func,
};

export default Toolbar;
