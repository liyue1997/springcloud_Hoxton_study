import React from 'react';
import { Select } from 'antd';
const {Option} =Select;
interface ICompProps {
  tsmodule: any[]; 
  value?:string;
  onChange?:(changedValue:string)=>void;
}
interface tsmodellist{
  module_id:string;
  module_name:string;
}
interface ICompstate {
  selectValue: string;
}
export default class TsModuleComp extends React.Component<ICompProps, ICompstate> {
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
    const {tsmodule} = this.props;
    return (<Select style={{ width: "100%" }} showSearch allowClear placeholder="请选择"
                onChange={this.handleSelectChange}
                value={this.state.selectValue}>
              {
                tsmodule.map((item:tsmodellist) => {
                  return (<Option key={item.module_id} value={item.module_id}>{item.module_id}{item.module_name}</Option>);
                })
              }
            </Select>
    );
  }
}