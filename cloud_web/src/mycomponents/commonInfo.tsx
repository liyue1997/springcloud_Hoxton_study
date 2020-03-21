import React, { Component, ReactNode } from 'react';
import { Dispatch } from 'redux';
import { routerRedux } from 'dva';
import { Row, Col, Form, Input, Button, message } from 'antd';


export const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};
export const submitFormLayout = {
  wrapperCol: {
    xs: { span: 10, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

export interface IInfoProps {
  dispatch: Dispatch,
  location: any,
  form: any,
  moprs?: any,
  mrszones?: any,
  mrsdls?: any,
  mtsmodule?: any,
  mtsrole?:any,
  mtsopr?: any,
  mtsSubsys?:any,
}
export interface IInfoState {
  objUrl: string,
  edit: string,//"none" | "add" | "update"
  queryMap: {},
  moduleCode: string,
  objid: string,
  curObj: {},
  selectedNode:any,
  dataSource:any
}
export interface IObjectData {
  code: string,
  msg?: string,
  data?: {},
}
export class CommonInfoPage extends Component<IInfoProps, IInfoState> {
  constructor(props: IInfoProps) {
    super(props);
  }
  getObjectName() {
    return 'RsUser';
  }
  getDefaultValues() {
    return {};
  }
  state = {
    objUrl: this.getObjectName(),
    edit: "none", //none 只读，update 是修改，add 是新增
    queryMap: {},
    moduleCode: "",
    objid: "",
    curObj: {},
    selectedNode:null,
    dataSource:null
  }
  componentDidMount() {
    const { dispatch } = this.props;
    this.setState({
      moduleCode: this.props.location.query.moduleCode,
      edit: this.props.location.query.edit,
      objid: this.props.location.query.id,
    }, () => {
      //getobj
      if (this.state.edit === "update" || this.state.edit === "none") {
        dispatch({
          type: 'mcommonobject/getobj',
          params: { objUrl: this.state.objUrl, id: this.state.objid },
          callback: (data: IObjectData) => {
            console.log("mcommonobject/getobj", data);
            if (data.code == "200") {
              this.setState({
                curObj: data.data || {},
              });
            } else {
              message.error(data.msg || "获取数据失败!");
            }

          },
        });
      }
      else if (this.state.edit === "add") {
        //newobj
        dispatch({
          type: 'mcommonobject/newobj',
          params: { objUrl: this.state.objUrl },
          callback: (data: IObjectData) => {
            console.log("mcommonobject/newobj", data);
            if (data.code == "200") {
              this.setState({
                curObj: { ...this.getDefaultValues(), ...data.data },
              });
            } else {
              message.error(data.msg);
            }
          },
        });
      }
    });
  }
  handleValues = (values: {}) => {
    return values;
  }
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { dispatch } = this.props;
    this.props.form.validateFieldsAndScroll((err: JSON, values: {}) => {
      if (!err) {
        let newvalues = this.handleValues(values);
        if (this.state.edit === "update") {
          dispatch({
            type: 'mcommonobject/updateobj',
            params: { objUrl: this.state.objUrl, ...this.state.curObj, ...newvalues },
            callback: (data: IObjectData) => {
              if (data.code === "203") {
                message.success("保存成功!");
                this.returnBack();
              }
              else {
                message.error(data.msg || "未知错误!");
              }
            },
          });
        }
        else if (this.state.edit === "add") {
          dispatch({
            type: 'mcommonobject/addobj',
            params: { objUrl: this.state.objUrl, ...this.state.curObj, ...values },
            callback: (data: IObjectData) => {
              if (data.code === "201") {
                message.success("保存成功!");
                this.returnBack();
              }
              else {
                message.error(data.msg || "未知错误!");
              }
            },
          });
        }
      }
    });

  };
  returnBack=()=>{
    const { dispatch } = this.props;
    dispatch(routerRedux.goBack());
  }

  getRows = (): ReactNode => {
    return [];
  }
  getCol = (title: string, key: string, required = false) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const curObj = this.state.curObj || {};
    if (required) {
      return <Col span={24}>
        <Form.Item {...formItemLayout} hasFeedback label={title}>
          {getFieldDecorator(key, {
            initialValue: curObj[key],
            rules: [
              {
                required: true,
                message: title + '不能缺失!',
              },
            ],
          })(<Input />)}
        </Form.Item>
      </Col>;
    }
    else {
      return <Col span={24}>
        <Form.Item {...formItemLayout} hasFeedback label={title}>
          {getFieldDecorator(key, {
            initialValue: curObj[key],
          })(<Input />)}
        </Form.Item>
      </Col>;
    }
  }
  getColInput = (title: string, key: string, inputControl: ReactNode, required = false) => {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const curObj = this.state.curObj || {};
    if (required) {
      return <Col span={24}>
        <Form.Item {...formItemLayout} hasFeedback label={title}>
          {getFieldDecorator(key, {
            initialValue: curObj[key],
            rules: [
              {
                required: true,
                message: title + '不能缺失!',
              },
            ],
          })(inputControl)}
        </Form.Item>
      </Col>;
    }
    else {
      return <Col span={24}>
        <Form.Item {...formItemLayout} hasFeedback label={title}>
          {getFieldDecorator(key, {
            initialValue: curObj[key],
          })(inputControl)}
        </Form.Item>
      </Col>;
    }
  }

  //新建时可写
  getInputOnlyAdd(): ReactNode {
    if (this.state.edit === "add")
      return <Input />;
    return <Input disabled />;
  }
  //角色模块编码 不要用户输入  ok，等于 权限编码_模块编码
  getInputDefault(): ReactNode {
    return null;
  }
  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    const curObj = this.state.curObj || {};
    console.log("this.state111",this.state);
    return (
      <Form onSubmit={this.handleSubmit}>
        {
          this.getRows()
        }
        <Row>
          <Col span={24}>
            <Form.Item {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button
                onClick={ this.returnBack}
                className={this.state.objUrl+'btn'}
              >
                返回
              </Button>
              <Button
                style={{ marginLeft: 12,display:this.state.edit=="none"?"none":"inline-block"}}
                type="primary"
                htmlType="submit"
              >
                保存
                </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

};