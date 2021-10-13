import React from 'react';
import PropTypes from 'prop-types';
import './progress.css';

import Typography from 'antd/lib/typography';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const { Text } = Typography; 

function CustomProgress({progressData}) {
  const notFullWidth = (val, maxWidth) => {
    return (maxWidth/100)*val
  }

  // Progres bar
  let bars = progressData && progressData.length && progressData.map(function(item, i) {
    if(item.value > 0) {
      return (
        <div className="bar" style={{'backgroundColor': item.color, 'width': notFullWidth(item.value,94) + '%'}}  key={i}>

        </div>
      )
    }
  });

  let legends = progressData && progressData.length && progressData.map(function(item, i) {
        return (
          <Col span={12} style={{margin: '0px', height: '22px'}} key={i}>
            <span className="antprogressdot" style={{'color': item.color}}>●</span>
            <span className="antprogresslabel"><small><Text>{item.name} ({item.value} %)</Text></small></span>
          </Col>
       )
  });
  return (
    <div>
      <Row>
        <Col span={24}>
          <div className="multicolor-bar">
            <div className="bars">
              {bars == ''?'':bars}
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{marginTop: '20px', marginBottom: '11px'}}>
        <Col span={20} style={{textAlign: 'left'}}>
          <Row>
            {legends == ''?'':legends}
          </Row>
        </Col>
      </Row>
    </div>
      
  );
}

// We require the use of src and alt, only enforced by react in dev mode
CustomProgress.propTypes = {
  progressData: PropTypes.array
};

export default CustomProgress;
