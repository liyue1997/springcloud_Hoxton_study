import React from 'react';
import {Tag} from 'antd';

export function renderOpr(me, record){
    const mtsopr=me.props.mtsopr.data;
    const tags=record.oprset||'';
    var arr=tags.split(",");
        return (<span>
            {arr.map(tag => {
                const temp = mtsopr.find(item => item.opr_code === tag);
                // console.log("opr",temp);
                if (!temp)
                    return (<Tag>{tag}</Tag>);
                return (
                <Tag color={temp.color||"blue"} key={tag}>
                    {temp.opr_name}
                </Tag>
                );
            })}
        </span>);
}
export function rendermoduleType(me, value){
    if (value.module_type ==="ZJ")
        return <span>ZJ组件</span>;
    else
        return <span>link外链</span>;
}