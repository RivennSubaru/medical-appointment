"use client"

import { convertFileToUrl } from '@/lib/utils'
import Image from 'next/image'
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
    files: File[] | undefined,
    onChange: (files: File[]) => void
}

const FileUploade = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className='file-upload'>
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt='uploader image'
            className='max-h-[400px] overflow-hidden object-cover'
        />
      ) : (
        <>
            <Image
                src='/assets/icons/upload.svg'
                width={40}
                height={40}
                alt='upload'
            />
            <div className='file-upload_label'>
                <p className='text-14-regular'>
                    <span className='text-green-400'>Cliquer pour importer</span> ou faite glisser ici
                </p>
                <p>
                    SVG, PNG, JPG ou GIF(max. 800x400px)
                </p>
            </div>
        </>
      )}
    </div>
  )
}

export default FileUploade