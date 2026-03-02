import React from 'react';
import { Col, Row } from 'antd';

const App: React.FC = () => (
  <>
    <Row>
      <Col span={24}>col</Col>
    </Row>
    <Row>
      <Col style={{ backgroundColor: 'blue' }} span={12}>col-12</Col>
      <Col style={{ backgroundColor: 'red' }} span={12}>col-12</Col>
    </Row>
    <Row gutter={0}>
      <Col style={{ backgroundColor: 'green' }} span={5}>col-8</Col>
      <Col style={{ backgroundColor: 'skyblue' }} span={5}>col-8</Col>
      <Col style={{ backgroundColor: 'orange' }} span={5}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
  </>
);

export default App;