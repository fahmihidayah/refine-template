import { IResourceComponentsProps } from "@refinedev/core";
import { Create } from "@refinedev/chakra-ui";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
} from "@chakra-ui/react";
import { useForm } from "@refinedev/react-hook-form";

export default function CategoryCreate(): React.FC<IResourceComponentsProps>  {
    const {
        refineCore: { formLoading },
        saveButtonProps,
        register,
        formState: { errors },
    } = useForm();

    return (
        <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
            <FormControl mb="3" isInvalid={!!(errors as any)?.name}>
                <FormLabel>Name</FormLabel>
                <Input
                    type="text"
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
                <FormErrorMessage>
                    {(errors as any)?.name?.message as string}
                </FormErrorMessage>
            </FormControl>
            
        </Create>
    );
};
