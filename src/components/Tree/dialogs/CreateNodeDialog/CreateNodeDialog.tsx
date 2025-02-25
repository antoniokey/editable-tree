import { TextField } from '@mui/material';

import Modal from '../../../../shared/components/Modal/Modal';
import { TREE_NAME } from '../../constants/tree.constants';
import { TreeData } from '../../types/tree.types';

interface Props {
  node: TreeData;
  nodeName: string;
  setNodeName: (name: string) => void;
  closeModal: () => void;
  createTreeNode: (treeName: string, nodeId: number, nodeName: string) => void;
}

const CreateNodeDialog: React.FC<Props> = ({ node, nodeName, setNodeName, createTreeNode, closeModal }) => {
  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      onSubmit={() => {
        createTreeNode(TREE_NAME, node.id, nodeName);
        closeModal();
      }}
      title='Add'
      actionButtonLabel='Add'
    >
      <TextField
        label="Enter node name"
        variant="outlined"
        fullWidth={true}
        onChange={(e) => setNodeName(e.target.value)} />
    </Modal>
  );
};

export default CreateNodeDialog;
