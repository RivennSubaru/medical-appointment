import React, { JSXElementConstructor } from 'react'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control } from 'react-hook-form'
import { FormfieldType } from './PatientForm'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'


interface CustomProps {
    control: Control<any>,
    fieldType: FormfieldType,
    name: string,
    label?: string,
    placeholder?: string,
    icon?: React.ReactNode,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    remderSkeleton?: (field: any) => React.ReactNode,
}

const RenderInput = ({field, props}: {field:any, props: CustomProps}) => {
    const {fieldType, icon, placeholder } = props

    switch (fieldType) {
        case FormfieldType.INPUT:
            return (
                <div className='flex items-center rounded-md border border-dark-500 bg-dark-400'>
                    {icon}
                    <FormControl>
                        <Input 
                            placeholder={placeholder}
                            className='shad-input border-0'
                            {...field} 
                        />
                    </FormControl>
                </div>
            )
        case FormfieldType.PHONE_INPUT:
            return (
                <PhoneInput
                    defaultCountry='MG'
                    international
                    withCountryCallingCode
                    placeholder="Votre numeros de téléphone"
                    value={field.value}
                    onChange={field.onChange}
                    className='input-phone'
                />
            )
        default:
            break;
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormfieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}

                    <RenderInput props={props} field={field}/>
                    
                    <FormMessage className='shad-error'/>
                </FormItem>
            )}
        />
    )
}

export default CustomFormField