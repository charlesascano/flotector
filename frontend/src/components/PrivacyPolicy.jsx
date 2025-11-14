import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Text,
  UnorderedList,
  OrderedList,
  ListItem,
} from '@chakra-ui/react';

const PrivacyPolicy = ({isOpen, onClose}) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} size={'xl'} >
        <ModalOverlay  />
        <ModalContent >
            <ModalHeader>Privacy Policy</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Heading as="h4" size="sm" mb={2}>
                    1. What Information Do We Collect?
                </Heading>
                <Text mb={3}>
                    We collect <b>only three types</b> of information:
                </Text>
                <OrderedList spacing={2} mb={6} ml={6}>
                    <ListItem>
                    <b>Photographs:</b> The images you voluntarily upload through our
                    website. We ask that you only submit photos of waste and avoid
                    capturing faces or other personally identifiable information.
                    </ListItem>
                    <ListItem>
                    <b>Location Data (Geotags):</b> We extract the geographic
                    coordinates (latitude and longitude) from your photo's metadata (EXIF
                    data). This is essential for mapping where the waste was spotted.
                    </ListItem>
                    <ListItem>
                        <b>Date Taken:</b> We also extract the original date and time the
                        photo was captured from its metadata (EXIF data). This helps us
                        understand pollution trends over time.
                    </ListItem>
                </OrderedList>
                <Text mb={6}>
                    We <b>do not</b> collect or require any other personal information,
                    such as your name, email address, IP address, or phone number. All
                    submissions are anonymous.
                </Text>

                <Heading as="h4" size="sm" mb={2}>
                    2. How Do We Use Your Information?
                </Heading>
                <Text mb={3}>
                    Your submitted photos and location data are used <b>exclusively</b> for
                    the following academic and research purposes:
                </Text>
                <UnorderedList spacing={2} mb={6} ml={6}>
                    <ListItem>
                    <b>Training a Machine Learning Model:</b> Your photos may be used as a
                    training dataset for a computer vision model (YOLOv11) to learn how
                    to automatically detect and classify different types of waste.
                    </ListItem>
                    <ListItem>
                    <b>Mapping Waste Hotspots:</b> The location data is used to plot
                    submissions on a map, helping to visualize and analyze where floating
                    waste accumulates.
                    </ListItem>
                    <ListItem>
                    <b>Academic Publication:</b> The findings of this research, including
                    aggregated, anonymous data and sample images, may be published in a
                    thesis, academic paper, or conference presentation.
                    </ListItem>
                </UnorderedList>

                <Heading as="h4" size="sm" mb={2}>
                    3. How Do We Share Your Information?
                </Heading>
                <Text mb={3}>
                    We do not sell, rent, or trade your data. We only share it in the
                    following limited ways:
                </Text>
                <UnorderedList spacing={2} mb={6} ml={6}>
                    <ListItem>
                        <b>Public Map and Table:</b> All submitted data (including the
                        <b> photo</b>, its <b>location</b>, and the <b>date it was taken</b>) will
                        be made publicly visible on our website's map and in a data table. This
                        is essential for the project's goal of creating an accessible
                        database of waste hotspots.
                    </ListItem>
                </UnorderedList>

                <Heading as="h4" size="sm" mb={2}>
                    4. Your Rights & Data Retention
                </Heading>
                <UnorderedList spacing={2} mb={6} ml={6}>
                    <ListItem>
                    <b>Retention:</b> We will keep your data for the duration of this
                    research project. Once the project and any related academic
                    evaluations are complete, the data will be either securely deleted or
                    fully anonymized for archival purposes.
                    </ListItem>
                    <ListItem>
                    <b>Deletion:</b> Since all submissions are anonymous, we cannot trace
                    a specific submission back to an individual. However, if you believe
                    you have accidentally submitted a photo that contains sensitive or
                    personal information (like a face), please contact us with details
                    about the photo (e.g., location and time), and we will make a
                    reasonable effort to find and delete it.
                    </ListItem>
                </UnorderedList>

                <Heading as="h4" size="sm" mb={2}>
                    5. Changes to This Policy
                </Heading>
                <Text mb={6}>
                    We may update this policy in the future, for example, if the scope of
                    the research changes. Any updates will be posted on this page.
                </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                OK
              </Button>
            </ModalFooter>
          </ModalContent>
      </ Modal>
    );
}

export default PrivacyPolicy