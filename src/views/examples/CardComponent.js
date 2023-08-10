import React from 'react';
import { Card, CardBody } from 'reactstrap';

const CardComponent = ({ title, value, percentage, icon }) => {
  return (
    <Card className="p-1 mb-4 mt-2">
      <CardBody className="text-left">
        <div className="d-flex align-items-center">
          <div className="flex-grow-1" style={{ marginLeft: '-10px', marginRight: '90px' }}>
            <h4 className="mb-2" style={{ color: '#7d7d7d', fontWeight: 600 }}>
              {title}
            </h4>
            <div className="mb-2">
              <h4>
                {value} <span style={{ color: '#09db10', marginLeft: '5px' }}>{percentage}%</span>
              </h4>
            </div>
          </div>
          <div>
            <span
              style={{
                backgroundImage: 'linear-gradient(45deg, #FFA500, #FF4500)',
                padding: '15px',
                borderRadius: '10px',
                boxShadow: '3px 3px 8px #cbcbcb, -3px -3px 8px #ffffff',
              }}
            >
              {icon}
            </span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardComponent;
