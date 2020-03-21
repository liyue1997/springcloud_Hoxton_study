import React from 'react';
import { Select, Checkbox, Button } from 'antd';
import { supportsHistory } from 'history/DOMUtils';
const {Option} =Select;
interface ICompProps {
  oprs: any[]; 
  value?:string;
  onChange?:(changedValue:string)=>void;
}

interface ICompstate {
  selectValue: string;
  
}
export default class TsOprComp extends React.Component<ICompProps, ICompstate> {
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

  triggerChange = (changedValue:string) => {
    if (this.props.onChange) {
      this.props.onChange(changedValue);
    }
  }
  onChange =(checkedValues:any)=> {
    let oprs="";
    checkedValues.map(item=>oprs=oprs+item+",");
    if (oprs.length>0)
       oprs = oprs.substring(0, oprs.length - 1);
    this.setState({
      selectValue:oprs
    });
    this.triggerChange(oprs);
  }
  onAllcheckChange =(e:any)=> {
    if ( e.target.checked)
    {
      const {oprs} = this.props;
      let coprs="";
      oprs.map(item=>coprs=coprs+item.opr_code+",");
      if (coprs.length>0)
        coprs = coprs.substring(0, coprs.length - 1);
      this.setState({
        selectValue:coprs
      });
      this.triggerChange(coprs);

    }
    else{
      this.setState({
        selectValue:""
      });
      this.triggerChange("");
    }
   
  }
  normalCheck =(e)=>{
    this.setState({
      selectValue:"QUERY,NEW,UPDATE,SAVE,DELETE,EXPORT"
    });
    this.triggerChange("QUERY,NEW,UPDATE,SAVE,DELETE,EXPORT");

  }
  setDefaultValues=(checklist:string)=>{
    this.setState({
      selectValue:checklist
    });
    this.triggerChange(checklist);
  }
  render() {
    console.log("this.state.selectValue",this.state.selectValue);
    const {oprs} = this.props;
    let plainOptions = [];
    oprs.map(item=>plainOptions.push({label: item.opr_name, value: item.opr_code}));
    let  oprsetlist=[];
    if(this.state.selectValue)
      oprsetlist=this.state.selectValue.split(",");
    const allchecked=oprsetlist.length===plainOptions.length;
    const allchecktext=allchecked?"取消全选":"全选";

    return (<div style={{ display: "inline" }}><Checkbox.Group options={plainOptions} onChange={this.onChange} value={oprsetlist} />
      <Checkbox checked={allchecked} onChange={this.onAllcheckChange}>{allchecktext}</Checkbox>
      <Button type="link"  onClick={this.normalCheck}>常用权限</Button>
      </div>);
  }
}