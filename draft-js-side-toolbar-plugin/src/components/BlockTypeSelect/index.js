/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

class BlockTypeSelect extends React.Component {

  state = {
    style: {
      transform: 'translate(-50%) scale(0)',
    },
  }

  onMouseEnter = () => {
    this.setState({
      style: {
        transform: 'translate(-50%) scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      },
    });
  }

  onMouseLeave = () => {
    this.setState({
      style: {
        transform: 'scale(0)',
      },
    });
  }

  onMouseDown = (clickEvent) => {
    clickEvent.preventDefault();
    clickEvent.stopPropagation();
    let style;
    if (!this.props.isExpanded) {
      style = {
        transform: 'scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      };
    } else {
      style = {
        transform: 'scale(0)',
      };
    }
    this.setState({
      style,
    });
    this.props.onExpand();
  }

  onClick = () => {
    let style;
    if (!this.props.isExpanded) {
      style = {
        transform: 'scale(1)',
        transition: 'transform 0.15s cubic-bezier(.3,1.2,.2,1)',
      };
    } else {
      style = {
        transform: 'scale(0)',
      };
    }
    this.setState({
      style,
    });
    this.props.onExpand();
  }

  render() {
    const { theme, getEditorState, setEditorState } = this.props;
    // const classnames = this.state.isExpanded ? `${theme.blockTypeSelectStyles.inlineToolbar} ${theme.blockTypeSelectStyles.isActive}` : `${theme.blockTypeSelectStyles.inlineToolbar}`;
    return (
      <div
        // onMouseEnter={this.onMouseEnter}
        // onMouseLeave={this.onMouseLeave}
        // onMouseDown={this.onMouseDown}
        className={theme.blockTypeSelectStyles.blockWrapper}
      >
        <div className={theme.blockTypeSelectStyles.blockType} onMouseDown={this.onMouseDown}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.2143 21.2143V0.785714C10.2143 -0.261905 11.7857 -0.261905 11.7857 0.785714V21.2143C11.7857 22.2619 10.2143 22.2619 10.2143 21.2143ZM21.2143 11.7857H0.785714C-0.261905 11.7857 -0.261905 10.2143 0.785714 10.2143H21.2143C22.2619 10.2143 22.2619 11.7857 21.2143 11.7857Z" fill="#202641" />
          </svg>
        </div>
        {/*
          The spacer is needed so the popup doesn't go away when moving from the
          blockType div to the popup.
        */}
        {/* <div className={theme.blockTypeSelectStyles.spacer} /> */}
        { <div className={theme.blockTypeSelectStyles.inlineToolbar || 'inlineToolbar'} style={this.props.isExpanded ? this.state.style : { transform: 'scale(0)' } } >
          {this.props.children({
            getEditorState,
            setEditorState,
            theme: theme.buttonStyles,
            onClick: this.onClick
          })}
        </div> }
      </div>
    );
  }
}

BlockTypeSelect.propTypes = {
  children: PropTypes.func,
  isExpanded: PropTypes.bool,
  onExpand: PropTypes.func,
};

export default BlockTypeSelect;

