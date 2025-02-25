import { TreeData } from '../components/Tree/types/tree.types';

export const fetchTreeData = async (treeName: string): Promise<TreeData> => {
  const data = await fetch(
    `${import.meta.env.VITE_API_URL}/api.user.tree.get?treeName=${treeName}`,
    { method: 'POST'},
  );

  const treeData = await data.json();

  return treeData;
};

export const createTreeData = async (
  treeName: string,
  parentNodeId: number,
  nodeName: string,
): Promise<TreeData> => {
  const data = await fetch(
    `${import.meta.env.VITE_API_URL}/api.user.tree.create?treeName=${treeName}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`, 
    { method: 'POST' },
  );

  const treeData = await data.json();

  return treeData;
};

export const deleteTreeData = async (treeName: string, nodeId: number): Promise<TreeData> => {
  const data = await fetch(
    `${import.meta.env.VITE_API_URL}/api.user.tree.delete?treeName=${treeName}&nodeId=${nodeId}`,
    { method: 'POST' },
  );

  const treeData = await data.json();

  return treeData;
};

export const renameTreeData = async (
  treeName: string,
  nodeId: number,
  newNodeName: string,
): Promise<TreeData> => {
  const data = await fetch(
    `${import.meta.env.VITE_API_URL}/api.user.tree.create?rename=${treeName}&nodeId=${nodeId}&newNodeName=${newNodeName}`,
    { method: 'POST' },
  );

  const treeData = await data.json();

  return treeData;
};
