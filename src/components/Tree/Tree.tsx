import { useState } from 'react';

import TreeNode from './components/TreeNode';
import styles from './Tree.module.scss';
import useTree from './hooks/useTree';

const Tree: React.FC = () => {
  const [focusedNodeId, setFocusedNodeId] = useState<number | null>(null);

  const { treeData, createTreeNode, deleteTreeNode, renameTreeNode } = useTree();

  if (!treeData) {
    return null;
  }

  const handleNodeClick = (id: number | null) => setFocusedNodeId(id);

  return (
    <div className={styles.treeContainer}>
      <TreeNode
        node={treeData}
        level={0}
        focusedNodeId={focusedNodeId}
        createTreeNode={createTreeNode}
        deleteTreeNode={deleteTreeNode}
        renameTreeNode={renameTreeNode}
        onNodeClick={handleNodeClick}
      />
    </div>
  );
}

export default Tree;
