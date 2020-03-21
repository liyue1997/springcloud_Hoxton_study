import React,{ReactNode} from 'react';
import { connect } from 'dva';
import { Row ,Col, Form, Input, Checkbox} from 'antd';
import {CommonInfoPage,formItemLayout} from '@/mycomponents/commonInfo';
import {CommonConnectState} from '@/models/commonDefines';
import RsZoneComp from '@/mycomponents/RsZoneComp';
import RsDlsComp from '@/mycomponents/RsDlsComp';


// @connect(({ mrszones, mrsdls }) => ({ mrszones, mrsdls }))
// @Form.create({})  // 查询方法等于提交表单submit，这里用来创建form
class RsUserYwerInfoPage extends CommonInfoPage {
  getObjectName(){
    return 'RsUser';
  }
  getDefaultValues(){
    return {dlsUserType:'ywer'};
  }
  componentDidMount() {
    super.componentDidMount();
    const { dispatch } = this.props;
    console.log("RsUserYwerInfoPage componentDidMount",this.props.location.query);
    dispatch({
      type: `mrszones/queryAll`,
    });
    dispatch({
      type: `mrsdls/queryAll`,
    });
  }
  handleValues =(values:{})=>{
    values["isActive"]=values["isActive"] ? 1 : 0;
    return values;
  }
  getIsActive(){
    const { form} = this.props;
    const { getFieldDecorator } = form;
    const curObj =this.state.curObj || {};
    return  <Col span={24}>
    <Form.Item {...formItemLayout} label="是否在职">
      {getFieldDecorator('isActive', {
        valuePropName: 'checked',
        initialValue: curObj["isActive"]===1,
        rules: [
          {
            required: false,
            message: '是否在职不能缺失!',
          },
        ],
      })(<Checkbox/>)}
    </Form.Item>
  </Col>;
  }
  getRows=():ReactNode=>{
    const mrszones = this.props.mrszones.data;
    const mrsdls = this.props.mrsdls.data;
    return (<Row>
      {this.getColInput("用户id",'userId',<Input disabled />,true)}
      {this.getCol("用户姓名:",'userName',true)}
      {this.getCol("用户工号:",'userNumber')}
      {this.getCol("用户手机号:",'userPhone',true)}
      {this.getColInput("代理商:",'dlsId',<RsDlsComp rsdls={mrsdls} />,true)}
      {this.getColInput("区域:",'zoneCode',<RsZoneComp rszones={mrszones} />,true)}
      {this.getCol("用户电话:",'userTel',false)}
      {this.getCol("用户QQ号:",'userQq',false)}
      {this.getIsActive()} 
  </Row>);
  
  }
  render(){
      console.log("state",this.state);
      return super.render();
  }

};

export default connect(({moprs, mrszones, mrsdls }:CommonConnectState) => ({moprs, mrszones, mrsdls }))(Form.create()(RsUserYwerInfoPage));