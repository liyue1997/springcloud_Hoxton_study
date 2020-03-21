import React from 'react';
import {renderColumn} from '@/mycomponents/commonComp';

export function renderYesNo(me, value){
    if (value ===1)
        return <span>是</span>;
    return <span>否</span>;
}

export function renderdls(me, record){
    return renderColumn(record,me.props.mrsdls.data,"dls_id","dls_name");
}
export function renderzone(me, record){
    const mrszones = me.props.mrszones.data;
    if (!mrszones) return <span>{mrszones.zone_code}</span>;
    const temp = mrszones.find(item => item.zone_code === record.zone_code);
    if (!temp) return <span>{record.zone_code}</span>;
    return <span>{temp.zone_code}{temp.zone_name}</span>;
}

export function rendermenutree(me, value){
    console.log("value",value);
    return <span style={{ wordWrap: 'break-word', wordBreak: 'break-word',display: 'inline-block',textAlign:'left' }}>{value}</span>
}