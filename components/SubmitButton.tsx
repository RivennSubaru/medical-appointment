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
            <Loader2 className='animate-spin'/>
        ) : 
            children
        }
    </Button>
  )
}

export default SubmitButton