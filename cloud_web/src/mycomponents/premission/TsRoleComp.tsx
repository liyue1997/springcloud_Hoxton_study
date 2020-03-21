import React from 'react';
import { Select } from 'antd';
const {Option} =Select;
interface ICompProps {
  tsrole: any[]; 
  value?:string;
  id?:string;
  onChange?:(changedValue:string)=>void;
}
interface tsrolelist{
  role_code:string;
  role_name:string;
}
interface ICompstate {
  selectValue: string;
}

export default class TsRoleComp extends React.Component<ICompProps, ICompstate> {
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
    console.log("角色组件", this.props);
    const {tsrole} = this.props;
    return (<Select style={{ width: "100%" }} showSearch allowClear placeholder="请选择"
                onChange={this.handleSelectChange}
                value={this.state.selectValue}>
              {
                tsrole.map((item:tsrolelist) => {
                  return (<Option key={item.role_code} value={item.role_code}>{item.role_code}</Option>);
                })
              }
            </Select>
    );
  }
}