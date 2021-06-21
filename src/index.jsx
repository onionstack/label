import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { ContextMenuTrigger } from "react-contextmenu";
import styles from "./index.css";
import { Input, Tree } from "antd";
const { Search } = Input;
const { TreeNode, DirectoryTree } = Tree;
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import tabStyles from "react-tabs/style/react-tabs.css";
import classNames from "classnames";
// import fs from 'fs';
const dataPath = "./data.json";

let treeData = {
  user: [],
  content: [],
  product: [
    {
      title: "控制器",
      key: "0",
      image: "",
      information:
        "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
      children: [
        {
          title: "Micro:bit系列",
          key: "0-0",
          image: "",
          information:
            "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
          children: [
            {
              title: "Micro bit",
              key: "0-0-0",
              image: "",
              information:
                "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
            },
          ],
        },
        {
          title: "掌控版系列",
          key: "0-1",
          image: "",
          information:
            "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
          children: [
            {
              title: "掌控版IO扩展板",
              key: "0-1-0",
              image: "",
              information:
                "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
            },
          ],
        },
      ],
    },
    {
      title: "控制器",
      key: "1",
      image: "",
      information:
        "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
      children: [
        {
          title: "Micro:bit系列",
          key: "1-0",
          image: "",
          information:
            "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
          children: [
            {
              title: "Micro bit",
              key: "1-0-0",
              image: "",
              information:
                "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
            },
          ],
        },
        {
          title: "掌控版系列",
          key: "1-1",
          image: "",
          information:
            "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
          children: [
            {
              title: "掌控版IO扩展板",
              key: "1-1-0",
              image: "",
              information:
                "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
            },
          ],
        },
      ],
    },
    {
      title: "机器人平台",
      key: "2",
      image: "",
      information:
        "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
      children: [
        {
          title: "海盗船四轮机器人",
          key: "2-0",
          image: "",
          information:
            "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
        },
        {
          title: "风火轮",
          key: "2-1",
          image: "",
          information:
            "aaaaaaaaaaaaaaaaa\nbbbbbbbbbbbb\nccccccccccccccccc\ndddddddddd",
        },
      ],
    },
  ],
};

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ceateTable(content) {
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
          return this.ceateTable(item);
        })}
      </div>
    );
  }
}

class FileTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // fs.readFile(dataPath, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(data.toString());
    //   }
    // });
  }

  getNodeNumber(node) {
    let key = node.key || "";
    return key.split("-").length - 1;
  }

  renderTreeNodes(data) {
    return data.map((item) => {
      let style = "";
      let title = item.title;
      let disabled = false;

      if (this.getNodeNumber(item) === 0) {
        style = styles.rootNode;
      }

      if (!item.isLeaf && item.children) {
        return (
          <TreeNode
            className={style}
            disabled={disabled}
            title={title}
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          className={style}
          disabled={disabled}
          key={item.key}
          title={title}
          isLeaf={true}
          dataRef={item}
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.fileTree}>
        <div className={styles.search}>
          <Search placeholder="Search" onChange={this.onChange} />
        </div>
        <ContextMenuTrigger>
          <DirectoryTree>
            {this.renderTreeNodes(treeData.product)}
          </DirectoryTree>
        </ContextMenuTrigger>
      </div>
    );
  }
}

class ProductInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className={styles.productInformation}></div>;
  }
}

class FileTreeStreamline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderTreeNodes(data) {
    return data.map((item) => {
      let title = item.title;
      let disabled = false;

      if (!item.isLeaf && item.children) {
        return (
          <TreeNode
            disabled={disabled}
            title={title}
            key={item.key}
            dataRef={item}
          >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          disabled={disabled}
          key={item.key}
          title={title}
          isLeaf={true}
          dataRef={item}
        />
      );
    });
  }

  render() {
    return (
      <div className={styles.fileTreeStreamline}>
        <ContextMenuTrigger>
          <DirectoryTree>
            {this.renderTreeNodes(treeData.product)}
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

const ScratchTabComponent = (props) => {
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

const appTarget = document.createElement("div");
document.body.appendChild(appTarget);
ReactDOM.render(<ScratchTabComponent />, appTarget);
