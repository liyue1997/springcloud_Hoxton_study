import React from 'react';
import { Select } from 'antd';
const {Option} =Select;
//https://www.cnblogs.com/crazycode2/p/9784882.html
//表单组件 需要通过 value 来获取初始值 （可以是一个json）
//    如果 value 是json 就可以 直接修改this.props.value.selectValue =selectValue;
//    如果 value 是字符串 不能直接修改，就要 用onChange(changedValue);来处理
interface ICompProps {
  rszones: any[]; 
  value?:string;
  onChange?:(changedValue:string)=>void;
}
interface zoneinfolist{
  zone_code:string;
  zone_name:string;
}
interface ICompstate {
  selectValue: string;
}

export default class RsZoneComp extends React.Component<ICompProps, ICompstate> {

  constructor(props: ICompProps) {
      super(props);
      this.state = {
         selectValue: props.value || ""
      };
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps:any) {
    if ('value' in nextProps) {
      this.setState({selectValue: nextProps.value});
    }
  }
  handleSelectChange = (selectValue:string) => {
    if (!('value' in this.props)) {
      this.setState({ selectValue });
    }
    else
      this.setState({selectValue: selectValue});
    this.triggerChange( selectValue );
  }
  triggerChange = (changedValue:string) => {
    if (this.props.onChange) {
      this.props.onChange(changedValue);
    }
  }

  render() {
    const {rszones} = this.props;
    return (<Select  style={{ width: "100%" }} showSearch allowClear placeholder="请选择"
              onChange={this.handleSelectChange}
              value={this.state.selectValue}>
              {rszones.map((item:zoneinfolist) => {
                  return (<Option key={item.zone_code} value={item.zone_code}>{item.zone_code}{item.zone_name}</Option>);
               })
              }
            </Select>
    );
  }
}
