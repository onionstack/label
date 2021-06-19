import React from 'react';
import ReactDOM from 'react-dom';
import styles from 'antd/dist/antd.css';
import { ContextMenuTrigger } from 'react-contextmenu';
// import './index.css';
import { Tree } from 'antd';
const { TreeNode, DirectoryTree } = Tree;

const treeData = [
    {
        title: '0-0',
        key: '0-0',
        children: [
            {
                title: '0-0-0',
                key: '0-0-0',
                children: [
                    {
                        title: '0-0-0-0',
                        key: '0-0-0-0',
                    },
                    {
                        title: '0-0-0-1',
                        key: '0-0-0-1',
                    },
                    {
                        title: '0-0-0-2',
                        key: '0-0-0-2',
                    },
                ],
            },
            {
                title: '0-0-1',
                key: '0-0-1',
                children: [
                    {
                        title: '0-0-1-0',
                        key: '0-0-1-0',
                    },
                    {
                        title: '0-0-1-1',
                        key: '0-0-1-1',
                    },
                    {
                        title: '0-0-1-2',
                        key: '0-0-1-2',
                    },
                ],
            },
            {
                title: '0-0-2',
                key: '0-0-2',
            },
        ],
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            {
                title: '0-1-0-0',
                key: '0-1-0-0',
            },
            {
                title: '0-1-0-1',
                key: '0-1-0-1',
            },
            {
                title: '0-1-0-2',
                key: '0-1-0-2',
            },
        ],
    },
    {
        title: '0-2',
        key: '0-2',
    },
];

class Label extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: ['0-0-0', '0-0-1'],
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
            autoExpandParent: true
        };
    }





    render() {

        const onExpand = (expandedKeysValue) => {
            console.log('onExpand', expandedKeysValue); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
            // or, you can remove all expanded children keys.
            this.setState({
                expandedKeys: expandedKeysValue,
                autoExpandParent: false
            });
        };

        const onCheck = (checkedKeysValue) => {
            console.log('onCheck', checkedKeysValue);
            this.setState({
                checkedKeys: checkedKeysValue
            });
        };

        const onSelect = (selectedKeysValue, info) => {
            console.log('onSelect', info);
            this.setState({
                selectedKeys: selectedKeysValue
            });
        };

        const data = {
            title: '0-0-0-2',
            key: '0-0-0-2',
        };

        return (
            <div>
                <ContextMenuTrigger>
                    <DirectoryTree>
                        <TreeNode key={data.key} title={data.title} dataRef={data}>
                            <TreeNode key={data.key} title={data.title} dataRef={data}></TreeNode>
                        </TreeNode>
                    </DirectoryTree>
                </ContextMenuTrigger>
            </div>



            // <Tree
            //     checkable
            //     onExpand={onExpand}
            //     expandedKeys={this.state.expandedKeys}
            //     autoExpandParent={this.state.autoExpandParent}
            //     onCheck={onCheck}
            //     checkedKeys={this.state.checkedKeys}
            //     onSelect={onSelect}
            //     selectedKeys={this.state.selectedKeys}
            //     treeData={treeData}
            // />
        )
    }
}


const ScratchTabComponent = props => {
    return (
        <div>
            <Label />
        </div>
    );
};

const appTarget = document.createElement('div');
appTarget.style = styles;
document.body.appendChild(appTarget);
ReactDOM.render(<ScratchTabComponent />, appTarget);