import { useShow, IResourceComponentsProps } from "@refinedev/core";
import {
    Show,
    NumberField,
    TagField,
    TextField,
    DateField,
} from "@refinedev/chakra-ui";
import { Heading, HStack } from "@chakra-ui/react";

export default function CategoryShow(): React.FC<IResourceComponentsProps>  {
    const { queryResult } = useShow();
    const { data, isLoading } = queryResult;

    const record = data?.data;

    return (
        <Show isLoading={isLoading}>
            <Heading as="h5" size="sm" mt={4}>
                Id
            </Heading>
            <NumberField value={record?.id ?? ""} />
            <Heading as="h5" size="sm" mt={4}>
                Name
            </Heading>
            <TextField value={record?.name} />
            <Heading as="h5" size="sm" mt={4}>
                Created At
            </Heading>
            <DateField value={record?.created_at} />
            <Heading as="h5" size="sm" mt={4}>
                Updated At
            </Heading>
            <DateField value={record?.updated_at} />
        </Show>
    );
};
