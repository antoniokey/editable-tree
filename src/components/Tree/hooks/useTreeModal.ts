import { useState } from 'react';

import { TreeModalType } from '../constants/tree.constants';
import { TreeData } from '../types/tree.types';

interface UseTreeModalData {
  node: TreeData;
}

const useTreeModal = ({ node }: UseTreeModalData) => {
  const [modalType, setModalType] = useState<TreeModalType | null>(null);
  const [nodeName, setNodeName] = useState<string>(node.name);

  const openModal = (type: TreeModalType, initialValue = '') => {
    setModalType(type);
    setNodeName(initialValue);
  };

  const closeModal = () => {
    setModalType(null);
    setNodeName('');
  };

  return {
    modalType,
    nodeName,
    openModal,
    closeModal,
    setNodeName,
  };
};

export default useTreeModal;