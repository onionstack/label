import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import { ContextMenuTrigger } from 'react-contextmenu';
import styles from './index.css';
import { Input, Tree } from 'antd';
const { Search } = Input;
const { TreeNode, DirectoryTree } = Tree;
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import tabStyles from 'react-tabs/style/react-tabs.css';
import classNames from 'classnames';

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
                        children: [
                            {
                                title: '0-0-0-0',
                                key: '0-0-0-0-1',
                            },
                            {
                                title: '0-0-0-1',
                                key: '0-0-0-1-1',
                            },
                            {
                                title: '0-0-0-2',
                                key: '0-0-0-2-1',
                                children: [
                                    {
                                        title: '0-0-0-0',
                                        key: '0-0-0-0-1-1',
                                    },
                                    {
                                        title: '0-0-0-1',
                                        key: '0-0-0-1-1-1',
                                    },
                                    {
                                        title: '0-0-0-2',
                                        key: '0-0-0-2-1-1',
                                        children: [
                                            {
                                                title: '0-0-0-0',
                                                key: '0-0-0-0-1-1-1',
                                            },
                                            {
                                                title: '0-0-0-1',
                                                key: '0-0-0-1-1-1-1',
                                            },
                                            {
                                                title: '0-0-0-2',
                                                key: '0-0-0-2-1-1-1',
                                                children: [
                                                    {
                                                        title: '0-0-0-0',
                                                        key: '0-0-0-0-1-1-1-1',
                                                    },
                                                    {
                                                        title: '0-0-0-1',
                                                        key: '0-0-0-1-1-1-1-1',
                                                    },
                                                    {
                                                        title: '0-0-0-2',
                                                        key: '0-0-0-2-1-1-1-1',
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
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

class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    ceateTable(content) {
        // return (<h1 className={styles.table}>{content}</h1>)
        return (
            <div className={styles.tableList}>
                <h1 className={styles.table}>{content}</h1>
            </div>
        );
    }

    render() {
        return (
            <div className={styles.tables}>
                {["用户标签", "内容标签", "产品标签"].map((item) => {
                    return this.ceateTable(item)
                })}
            </div>
        )
    }
}

class FileTree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedKeys: ['0-0-0', '0-0-1'],
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
            autoExpandParent: true
        };
    }

    renderTreeNodes(data) {
        return data.map(item => {
            let title = item.title;
            let disabled = false;

            if (!item.isLeaf && item.children) {
                return (
                    <TreeNode disabled={disabled} title={title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode disabled={disabled} key={item.key} title={title} isLeaf={item.isLeaf} dataRef={item} />;
        });
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

        return (
            <div className={styles.fileTree}>
                <div className={styles.search}>
                    <Search placeholder="Search" onChange={this.onChange} />
                </div>
                <ContextMenuTrigger>
                    <DirectoryTree>
                        {this.renderTreeNodes(treeData)}
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

class ProductInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className={styles.productInformation}></div>
        );
    }
}

class FileTreeStreamline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    renderTreeNodes(data) {
        return data.map(item => {
            let title = item.title;
            let disabled = false;

            if (!item.isLeaf && item.children) {
                return (
                    <TreeNode disabled={disabled} title={title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode disabled={disabled} key={item.key} title={title} isLeaf={item.isLeaf} dataRef={item} />;
        });
    }

    render() {
        return (
            <div className={styles.fileTreeStreamline}>
                <ContextMenuTrigger>
                    <DirectoryTree>
                        {this.renderTreeNodes(treeData)}
                    </DirectoryTree>
                </ContextMenuTrigger>
            </div>
        );
    }
}


// class DividingFileTree extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         };
//     }

//     render() {
//         return (
//             <div className={styles.dividingFileTree}></div>
//         );
//     }
// }

// class DividingProductInformation extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {

//         };
//     }

//     render() {
//         return (
//             <div className={styles.dividingProductInformation}></div>
//         );
//     }
// }



const ScratchTabComponent = props => {
    return (
        <div>
            <Tables />
            <FileTree />
            {/* <DividingFileTree /> */}
            <ProductInformation />
            {/* <DividingProductInformation /> */}
            <FileTreeStreamline />
        </div>
    );
};

const appTarget = document.createElement('div');
document.body.appendChild(appTarget);
ReactDOM.render(<ScratchTabComponent />, appTarget);