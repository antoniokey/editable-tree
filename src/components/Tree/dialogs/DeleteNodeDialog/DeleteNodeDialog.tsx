import { Typography } from '@mui/material';

import Modal from '../../../../shared/components/Modal';
import { TREE_NAME } from '../../constants/tree.constants';
import { TreeData } from '../../types/tree.types';

interface Props {
  node: TreeData;
  closeModal: () => void;
  deleteTreeNode: (treeName: string, nodeId: number) => void;
}

const DeleteNodeDialog: React.FC<Props> = ({ node, closeModal, deleteTreeNode }) => {
  return (
    <Modal
      isOpen={true}
      onClose={closeModal}
      onSubmit={() => {
        deleteTreeNode(TREE_NAME, node.id);
        closeModal();
      }}
      title="Delete"
      actionButtonLabel="Delete"
      actionButtonVariant="outlined"
      actionButtonColor="secondary"
    >
      <Typography variant="body1">Do you want to delete {node.name}?</Typography>
    </Modal>
  );
};

export default DeleteNodeDialog;
