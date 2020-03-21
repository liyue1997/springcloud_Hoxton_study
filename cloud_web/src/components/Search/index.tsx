import React, {Component} from 'react';
import {Form,Row,Col,Input,Select,Button,DatePicker,} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const {RangePicker} = DatePicker;

/**
 *   lixin 2013.4.19
 *   items [{     | array     | 数组包含元素对象
 *   type         | string    | 类型 判断是选择还是输入 名字按照antd组件名字传入
 *   label        | string    | 标题
 *   required     | boolean   | 是否必填项  true / false
 *   placeholder  | string    | 描述
 *   parameter    | string    | 参数名字
 *   options      | array     | 如果type为Select必须传，否则认为此组件是Input
 *   pattern      |           | 正则
 *   typeDiff     | boolean      | true type为Select的时候，key为string的时候会用到
 *   }]
 *   onSubmit     | function  | 提交方法
 *   onReset      | function  | 重置方法
 *   未完待续...
 *
 * */
@Form.create()
class Search extends Component {
  colLength: number;
  
  constructor(props: Readonly<{}>) {
    
    super(props);
    
    this.colLength = 3;//每行显示个数，暂时因为栅格布局不能修改
  }
  
  //根据items长度判断需要显示几行
  getChildren(items: string | any[], getFieldDecorator: any) {
    
    const len = items.length;
    const rowLen = Math.ceil(len / this.colLength);
    
    
    let rowArr = [];
    for (let i = 0, j = rowLen; i < j; i++) {
      rowArr.push(
        <Row key={i}>
          
          {
            this.getColItem(items, getFieldDecorator, i)
          }
        
        </Row>
      );
    }
    
    return rowArr;
    
    
  }
  
  
  //为每行里边塞Col
  getColItem(items: string | any[], getFieldDecorator: (arg0: any, arg1: { rules: { required: any; message: any; pattern: any; type: string; }[]; }) => { (arg0: JSX.Element | undefined): React.ReactNode; new(): any; }, start: number) {
    
    const colArr = [];
    
    const _this = this;
    
    //从items数组第几个元素开始循环
    const _start = start * this.colLength;
    
    //剩余几个对象没有遍历渲染
    const _surplus = items.length - _start;
    
    let len;
    //如果剩下的小于3 长度直接登录items的长度
    if (_surplus < this.colLength) {
      len = items.length;
    } else {
      //如果剩下的大于3，那么长度等于开始索引加3
      len = _start + this.colLength;
    }
    
    for (let i = _start, j = len; i < j; i++) {
      const index = i;
      const value = items[i];
      const _offset = index % this.colLength == 0 ? 0 : 1;
      
      let _type = value.type;
      
      let _options;
      if (value.hasOwnProperty('options')) {
        _options = value.options;
      } else {
        if (_type === 'RangePicker') {
          //
        } else {
          _type = 'Input';
        }
        
      }
      
      let _rulesType = 'number';
      
      if (_type === 'Input') {
        _rulesType = 'string';
        
      } else if (_type === 'RangePicker') {
        _rulesType = 'array';
      }
      
      if (value.typeDiff) {
        _rulesType = 'string';
      }
      
      const formItemLayout = {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      };
      colArr.push(
        <Col key={index} xl={{span: 7, offset: _offset}} lg={{span: 8}} md={{span: 12}} sm={24}>
          <FormItem label={`${value.label}：`} {...formItemLayout}>
            {getFieldDecorator(value.parameter, {
              rules: [{
                required: value.required,
                message: value.placeholder,
                pattern: value.pattern ? value.pattern : '',
                type: _rulesType
              }]
            })(
              _this.switchItem(_type, value.placeholder, _options)
            )}
          
          </FormItem>
        </Col>
      )
      
    }
    
    
    return colArr;
    
  }
  
  //如果是Select需要传入options
  switchItem(which: any, placeholder: {} | null | undefined, options: any) {
    const _this = this;
    switch (which) {
      
      case 'Input':
        return <Input placeholder={placeholder}/>
      case 'Select':
        return <Select placeholder={placeholder}>{_this.getOption(options)}</Select>
      case 'RangePicker':
        return <RangePicker/>
    }
  }
  
  getOption(data: any[]) {
    
    if (!data) {
      return;
    }
    
    return data.map((value, index) => {
      return <Option key={index} value={value.key}>{value.value}</Option>
    })
  }
  
  //重置输入框内容
  handleReset = () => {
    this.props.form.resetFields();
    if (this.props.onReset) {
      this.props.onReset();
    }
  }
  
  //提交
  handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    this.props.form.validateFields((err: any, fieldsValue: any) => {
      
      this.props.onSubmit(err, fieldsValue);
      
    });
    
    
  };
  
  render() {
    
    const {items, form, loading} = this.props;
    const {getFieldDecorator} = form;
    
    return (
      <Form onSubmit={this.handleSubmit} layout="horizontal">
        
        {
          this.getChildren(items, getFieldDecorator)
        }
        
        <Row type="flex" justify="end">
          <Col>
            <FormItem>
              <Button type="default" htmlType="button" style={{marginRight: '10px'}} onClick={this.handleReset}>
                重置
              </Button>
              <Button loading={loading} type="primary" htmlType="submit">
                查询
              </Button>
            </FormItem>
          </Col>
        
        </Row>
        {
          this.props.children
        }
      </Form>
    )
  }
}


export default Search;