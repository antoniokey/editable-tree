import { useCallback, useEffect, useState } from 'react';

import { TreeData } from '../types/tree.types';
import { TREE_NAME } from '../constants/tree.constants';
import {
  createTreeData,
  deleteTreeData,
  fetchTreeData,
  renameTreeData,
} from '../../../api/tree.actions';

const useTree = () => {
  const [treeData, setTreeData] = useState<TreeData | null>(null);

  useEffect(() => {
    fetchTree();
  }, []);

  const fetchTree = async () => {
    const treeData = await fetchTreeData(TREE_NAME);

    setTreeData(treeData);
  };

  const createTreeNode = useCallback(async (treeName: string, parentNodeId: number, nodeName: string) => {
    try {
      await createTreeData(treeName, parentNodeId, nodeName);
      await fetchTree();
    } catch(err) {
      console.log(err);
    }
  }, []);

  const deleteTreeNode = useCallback(async (treeName: string, nodeId: number) => {
    try {
      await deleteTreeData(treeName, nodeId);
      await fetchTree();
    } catch(err) {
      console.log(err);
    }
  }, []);

  const renameTreeNode = useCallback(async (treeName: string, nodeId: number, newNodeName: string) => {
    try {
      await renameTreeData(treeName, nodeId, newNodeName);
      await fetchTree();
    } catch(err) {
      console.log(err);
    }
  }, []);

  return { treeData, createTreeNode, deleteTreeNode, renameTreeNode };
};

export default useTree;
