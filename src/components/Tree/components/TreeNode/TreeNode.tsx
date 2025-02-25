import React, { useRef, useState } from 'react';
import clsx from 'clsx';

import { IconButton, Typography } from '@mui/material';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';

import { TreeData } from '../../types/tree.types';
import styles from './TreeNode.module.scss';
import { TreeModalType } from '../../constants/tree.constants';
import useTreeModal from '../../hooks/useTreeModal';
import RenameNodeDialog from '../../dialogs/RenameNodeDialog';
import DeleteNodeDialog from '../../dialogs/DeleteNodeDialog';
import CreateNodeDialog from '../../dialogs/CreateNodeDialog';

interface Props {
  node: TreeData;
  level: number;
  focusedNodeId: number | null;
  createTreeNode: (treeName: string, parentNodeId: number, nodeName: string) => void;
  deleteTreeNode: (treeName: string, nodeId: number) => void;
  renameTreeNode: (treeName: string, nodeId: number, newNodeName: string) => void;
  onNodeClick: (id: number | null) => void;
}

const TreeNode: React.FC<Props> = React.memo(({
  node,
  level,
  focusedNodeId,
  createTreeNode,
  deleteTreeNode,
  renameTreeNode,
  onNodeClick,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const buttonsRef = useRef(null);

  const { modalType, nodeName, setNodeName, openModal, closeModal } = useTreeModal({ node });

  const isFocused = focusedNodeId === node.id;

  const handleClick = () => {
    if (document.activeElement?.tagName.toLocaleLowerCase() !== 'button') {
      setIsExpanded(!isExpanded);
      onNodeClick(isFocused ? null : node.id);
    }
  };

  return (
    <>
      <div
        style={{ marginLeft: level ? level * 20 : 0 }}
        className={styles.nodeContainerWrapper}
      >
        <div className={styles.nodeContainer} onClick={handleClick}>
          {!!(node.children ?? []).length && (
            <div className={styles.nodeContainerIcon}>
              <ChevronRightOutlinedIcon className={clsx({ [styles.expandedIcon]: isExpanded })} />
            </div>
          )}
          <div className={clsx(styles.nodeContainerLabel, { [styles.nodeContainerLabelSelected]: isFocused })}>
            <Typography variant="body1">{node.name}</Typography>

            {isFocused && (
              <div ref={buttonsRef} className={styles.buttons}>
                <IconButton color="primary" onClick={() => openModal(TreeModalType.Create)}>
                  <ControlPointOutlinedIcon />
                </IconButton>
                <IconButton color="primary" onClick={() => openModal(TreeModalType.Update)}>
                  <ModeEditOutlineOutlinedIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => openModal(TreeModalType.Delete)}>
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
          </div>
        </div>
        <div className={styles.nodeChildren}>
          {isExpanded && (
            node.children.map(child => (
              <TreeNode
                key={child.id}
                node={child}
                level={level + 1}
                createTreeNode={createTreeNode}
                deleteTreeNode={deleteTreeNode}
                renameTreeNode={renameTreeNode}
                focusedNodeId={focusedNodeId}
                onNodeClick={onNodeClick}
              />
            ))
          )}
        </div>
      </div>

      {modalType === TreeModalType.Create && (
        <CreateNodeDialog
          closeModal={closeModal}
          createTreeNode={createTreeNode}
          node={node}
          nodeName={nodeName}
          setNodeName={setNodeName}
        />
      )}

      {modalType === TreeModalType.Delete && (
        <DeleteNodeDialog
          node={node}
          closeModal={closeModal}
          deleteTreeNode={deleteTreeNode}
        />
      )}

      {modalType === TreeModalType.Update && (
        <RenameNodeDialog
          closeModal={closeModal}
          renameTreeNode={renameTreeNode}
          node={node}
          nodeName={nodeName}
          setNodeName={setNodeName}
        />
      )}
    </>
  );
});

export default TreeNode;
