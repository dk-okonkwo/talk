import { UploadCloud } from 'lucide-react'
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

type FileUploaderProps = {
  files :File[] | undefined,
  onChange: (files:File[])=> void,
  multiple?: boolean
}
const FileUploader =({files,onChange,multiple}:FileUploaderProps)=> {
  const onDrop = useCallback((acceptedFiles:File[]) => {
    // Do something with the files
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps} = useDropzone({onDrop,multiple})
  const convertFileToUrl = (file: File) => URL.createObjectURL(file);
  return (
    <div {...getRootProps()} className='bg-[#EDEFF2] h-36 p-2 text-center overflow-hidden cursor-pointer flex gap-2 flex-wrap items-center justify-center border-dashed border focus-within:border-black/50 rounded-lg '>
      <input {...getInputProps()} />
      {
        files && files?.length>0 ?(
          // to show uploaded image
          files.map((file,i)=>{
            
            return(
            <img
             key={i}
             src={convertFileToUrl(file)}
             width={600}
             height={600}
             alt='uploaded file'
             className={`object-cover size-auto ${multiple && "w-12"}`}
            />
           )
          })
        ):(
          <div className='flex-col flex justify-center items-center text-gray-700 text-xs'>
           <UploadCloud className='bg-background text-main my-2  p-1 size-7 rounded-xl'/>
           <p className=''>
            <span className='text-main'>Click to upload </span>
            or drag and drop
           </p>
           <p >SVG, PNG, JPG or Gif (max 800x400)</p>
          </div>
        )
      }
    </div>
  )
}
export default FileUploader