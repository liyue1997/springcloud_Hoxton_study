import { ReactNode } from 'react';
import {Row, Input} from 'antd';
export function isEmpty(item :any) {
    return item === null || item === undefined || item === '';
}
//计算 ReactNode 的子节点个数，并不通用，只适用于 row 下面的col的计算
export function getLength(node:ReactNode):number {
    return node.props.children.length;
}
