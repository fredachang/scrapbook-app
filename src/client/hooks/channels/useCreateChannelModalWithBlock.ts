import { ChangeEvent, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useCreateChannelAndConnection } from "./useCreateChannelAndConnect";

export const useCreateChannelModalWithBlock = (
  blockId: string,
  handleCloseConnect: () => void
) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const { profile } = useAuthContext();
  const userName = `${profile?.firstName}-${profile?.lastName}`;
  const navigate = useNavigate();

  const newMutation = useCreateChannelAndConnection();

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleIsPrivate = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPrivate(e.target.checked);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const variables = {
      title: title,
      isPrivate: isPrivate,
      blockId: blockId,
    };

    newMutation.mutateAsync(variables).then(() => {
      navigate(`/channels/${userName}`, { replace: true });
      setShowModal(false);
      setTitle("");
      setIsPrivate(false);
      handleCloseConnect();
    });
  };

  const handleShowModal = () => {
    setShowModal((prevValue) => !prevValue);
  };

  return {
    showModal,
    handleShowModal,
    title,
    handleTitle,
    isPrivate,
    handleIsPrivate,
    handleSubmit,
  };
};
