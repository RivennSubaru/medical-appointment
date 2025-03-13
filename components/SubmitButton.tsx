import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
    loading: boolean,
    className?: string,
    children: React.ReactNode
}

const SubmitButton = ({ loading, className, children }: ButtonProps) => {
  return (
    <Button 
        type="submit" 
        className={className ?? "w-full bg-green-500"} 
        disabled={loading}
    >
        {loading ? (
            <div className='flex items-center gap-2'>
                <Loader2 className='animate-spin'/>
                chargement...
            </div>
        ) : 
            children
        }
    </Button>
  )
}

export default SubmitButton