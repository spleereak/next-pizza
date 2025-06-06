import React from "react";
import {RequiredSymbol} from "@/shared/components/shared/required-symbol";
import {Input} from "@/shared/components/ui";
import {useFormContext} from "react-hook-form";
import {ClearButton, ErrorText} from "@/shared/components/shared";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {

  return (
    <div className={className}>
      {label && (
        <p>
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className='relative'>
        <Input className='h-12 text-md' {...props} />

        <ClearButton />
      </div>

      <ErrorText text='Поле обязательное для заполнения' className='mt-2' />
    </div>
  )
}