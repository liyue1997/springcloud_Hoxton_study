import React, { ReactNode } from 'react';
import { Select } from 'antd';
const {Option} =Select;

export const DateFormat = 'YYYY-MM-DD';
// list 的查询区域 设置
export const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 7 },
      md: { span: 7 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 17 },
      md: { span: 17 },
    },
  };
export function selectYesNo():ReactNode{
  return (<Select style={{ width: "100%" }} showSearch allowClear placeholder="请选择"><Option value="">全部</Option><Option value="1">是</Option><Option value="0">否</Option></Select>);
}
export function selectIsUsed():ReactNode{
  return (<Select style={{ width: "100%" }} showSearch allowClear placeholder="请选择"><Option value={1}>是</Option><Option value={0} >否</Option></Select>);
}  
export function selectModelType():ReactNode{
  return (<Select style={{ width: "100%" }} showSearch allowClear placeholder="请选择"><Option value="">全部</Option><Option value="ZJ">ZJ组件</Option><Option value="link">link外链</Option></Select>);
}
export function selectModelTypeinfo():ReactNode{
  return (<Select style={{ width: "100%" }} showSearch allowClear placeholder="请选择"><Option value="ZJ">ZJ组件</Option><Option value="link">link外链</Option></Select>);
}  
export function renderColumn(record:JSON[],data:JSON[],key:string,value:string){
  if (!data) return <span>{data[key]}</span>;
  const temp = data.find(item => item[key] === record[key]);
  if (!temp) return <span>{record[key]}</span>;
  return <span>{temp[value]}</span>;
}