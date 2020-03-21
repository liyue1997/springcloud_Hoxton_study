import React from 'react';
import { Select } from 'antd';
const {Option} =Select;
interface ICompProps {
  tsSubsys: any[]; 
  value?:string;
  id?:string;
  onChange?:(changedValue:string)=>void;
}
interface tsSubsyslist{
  subsys_name:string;
  subsys_id:string;
}
interface ICompstate {
  selectValue: string;
}

export default class TsSubsysComp extends React.Component<ICompProps, ICompstate> {
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
    const {tsSubsys} = this.props;
    return (<Select style={{ width: "100%" }} showSearch allowClear placeholder="请选择"
                onChange={this.handleSelectChange}
                value={this.state.selectValue}>
              {
                tsSubsys.map((item:tsSubsyslist) => {
                  return (<Option key={item.subsys_id} value={item.subsys_id}>{item.subsys_id}{item.subsys_name}</Option>);
                })
              }
            </Select>
    );
  }
}