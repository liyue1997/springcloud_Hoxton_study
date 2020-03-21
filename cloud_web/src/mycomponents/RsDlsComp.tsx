import React from 'react';
import { Select } from 'antd';
const {Option} =Select;
interface ICompProps {
  rsdls: any[]; 
  value?:string;
  onChange?:(changedValue:string)=>void;
}
interface dlsinfolist{
  dls_id:string;
  dls_name:string;
}
interface ICompstate {
  selectValue: string;
}
export default class RsDlsComp extends React.Component<ICompProps, ICompstate> {
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
    const {rsdls} = this.props;
    return (<Select style={{ width: "100%" }} showSearch allowClear placeholder="请选择"
                onChange={this.handleSelectChange}
                value={this.state.selectValue}>
              {
                rsdls.map((item:dlsinfolist) => {
                  return (<Option key={item.dls_id} value={item.dls_id}>{item.dls_name}</Option>);
                })
              }
            </Select>
    );
  }
}