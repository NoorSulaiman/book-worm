import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Menu, Dropdown, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import gravatarUrl from "gravatar-url";
import * as actions from "../../actions/auth";
import { allBooksSelector } from "../../reducers/books";
import "./mainNav.css";

const TopNavigation = ({ user, logout, hasBooks }) => (
  <Menu id="mainNav" secondary pointing>
    <Menu.Item as={Link} to="/dashboard">
      Dashboard
    </Menu.Item>
    {hasBooks && (
      <Menu.Item as={Link} to="/books/new">
        <Icon name="plus circle" size="small" />
        Add New Books
      </Menu.Item>
    )}

    <Menu.Menu position="right">
      <Dropdown trigger={<Image avatar src={gravatarUrl(user.email)} />}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => logout()}> Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

TopNavigation.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired
  }).isRequired,
  logout: PropTypes.func.isRequired,
  hasBooks: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.user,
    hasBooks: allBooksSelector(state).length > 0
  };
}
export default connect(mapStateToProps, { logout: actions.logout })(
  TopNavigation
);
