import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import request from "graphql-request";
import { useState } from "react";

import { AddVideoDocument } from "generated/graphql";

type Props = {
  userId: string;
};

const AddVideo = ({ userId }: Props): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [video, setVideo] = useState({
    title: "",
    url: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setVideo({
      ...video,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = async () => {
    setLoading(true);
    try {
      const { addVideo } = await request("/api/graphql", AddVideoDocument, {
        video: { created_by_id: userId, ...video },
      });
      setLoading(false);
      setMessage(`Video ${addVideo.title} added successfully`);
      setTimeout(() => {
        onClose();
        setVideo({
          title: "",
          url: "",
        });
        setMessage("");
      }, 750);
    } catch (e) {
      setLoading(false);
      setMessage(JSON.stringify(e));
    }
  };
  return (
    <>
      <Button onClick={onOpen}>Add Video</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {!loading ? (
              <FormControl isRequired>
                <FormLabel htmlFor="title">Video Title</FormLabel>
                <Input
                  id="title"
                  type="text"
                  name="title"
                  value={video.title}
                  onChange={handleChange}
                  required
                />
                <FormLabel htmlFor="url">Video URL</FormLabel>
                <Input
                  id="url"
                  type="url"
                  name="url"
                  value={video.url}
                  onChange={handleChange}
                  required
                />
              </FormControl>
            ) : (
              <Center>
                <Spinner size="xl" />
              </Center>
            )}
            {message && <Text>{message}</Text>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onSubmitHandler}>
              Add
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddVideo;
