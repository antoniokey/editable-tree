import { TextField } from '@mui/material';

import Modal from '../../../../shared/components/Modal/Modal';
import { TREE_NAME } from '../../constants/tree.constants';
import { TreeData } from '../../types/tree.types';

interface Props {
  node: TreeData;
  nodeName: string;
  setNodeName: (name: string) => void;
  closeModal: () => void;
  renameTreeNode: (treeName: string, nodeId: number, nodeName: string) => void;
}

const RenameNodeDialog: React.FC<Props> = ({ node, nodeName, setNodeName, renameTreeNode, closeModal }) => {
  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      onSubmit={() => {
        renameTreeNode(TREE_NAME, node.id, nodeName);
        closeModal();
      }}
      title='Rename'
      actionButtonLabel='Rename'
    >
      <TextField
        label="Enter node name"
        variant="outlined"
        color="primary"
        value={nodeName}
        fullWidth={true}
        onChange={(e) => setNodeName(e.target.value)} />
    </Modal>
  );
};

export default RenameNodeDialog;
