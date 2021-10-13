import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PropTypes from 'prop-types';

const Header = props => (
  <Row style={props.style} type="flex">
    <Col
      xs={10}
      sm={12}
      md={10}
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <h3
        style={{
          fontWeight: 'normal',
          marginBottom: 0,
          verticalAlign: 'middle',
        }}
      >
        My Credits
      </h3>
    </Col>
  </Row>
)

Header.propTypes = {
  style: PropTypes.object,
}


export default Header;