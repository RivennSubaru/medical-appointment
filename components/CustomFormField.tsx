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
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from 'lucide-react'


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
    renderSkeleton?: (field: any) => React.ReactNode,
}

const RenderInput = ({field, props}: {field:any, props: CustomProps}) => {
    const {fieldType, icon, placeholder, dateFormat, showTimeSelect, renderSkeleton } = props

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
        case FormfieldType.DATE_PICKER:
            return (
                <div className='flex items-center rounded-md border border-dark-500 bg-dark-400'>
                    <Calendar className='ml-12'/>
                    <FormControl>
                        <DatePicker
                            selected={field.value ? new Date(field.value) : null} 
                            onChange={(date) => field.onChange(date)}
                            dateFormat={dateFormat ?? "MM/dd/yyyy"}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel='Time:'
                            wrapperClassName='date-picker'
                        />
                    </FormControl>
                </div>
            )
        case FormfieldType.SKELETON:
            return (
                renderSkeleton ? renderSkeleton(field)
                : null
            )
        case FormfieldType.SELECT:
            return (
                <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className='shad-select-trigger'>
                                <SelectValue placeholder={placeholder}/>
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className='shad-select-content'>
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            )
        case FormfieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        placeholder={placeholder}
                        {...field}
                        className='shad-textArea'
                        disabled={props.disabled}
                    />
                </FormControl>
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
                <FormItem className='flex-1 flex flex-col'>
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