import { ElementType, useId, useState } from 'react'
import { FloatingPortal, offset, shift, useFloating } from '@floating-ui/react'
import { AnimatePresence, motion } from 'framer-motion'

interface PopoverProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
}

export default function Popover({ children, className, renderPopover, as: Element = 'div' }: PopoverProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { x, y, strategy, refs } = useFloating({
    middleware: [offset(6), shift()],
    placement: 'bottom-end'
  })

  const id = useId()

  const showPopover = () => {
    setIsOpen(true)
  }
  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <Element ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover} className={className}>
      {children}
      <FloatingPortal id={id}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: 'center top',
                zIndex: 100
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.2 }}
            >
              {renderPopover}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
