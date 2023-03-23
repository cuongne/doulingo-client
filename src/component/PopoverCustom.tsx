import { ChakraProvider } from "@chakra-ui/react";
import React, {
    useCallback, useEffect, useLayoutEffect, useRef,
    useState
} from "react";
import { createRoot } from 'react-dom/client';
import './style.scss';

// TODO: cover more positions
type Position = 'bottom-center' | 'bottom-left' | 'bottom-right';
interface RefElement extends HTMLElement {
    contains: (target: EventTarget | null) => boolean;
}
const defaultRect = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
};

type Rect = Pick<DOMRect, 'left' | 'top' | 'height' | 'width'>;
const PopoverContext = React.createContext<{
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    preferredPosition: Position;
    triggerRect: Rect;
    setTriggerRect: React.Dispatch<React.SetStateAction<Rect>>;
}>({
    isShow: false,
    setIsShow: () => {
        throw new Error('PopoverContext setIsShow should be used under provider');
    },
    preferredPosition: 'bottom-center',
    triggerRect: defaultRect,
    setTriggerRect: () => {
        throw new Error(
            'PopoverContext setTriggerRect should be used under provider'
        );
    },
});

export default function PopoverCustom({
    children,
    preferredPosition = 'bottom-center',
    content
}: {
    children: React.ReactElement;
    preferredPosition: Position;
    content: React.ReactElement;
}) {
    const [isShow, setIsShow] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [triggerRect, setTriggerRect] = useState(defaultRect);
    const ref = useRef<HTMLElement>(null);
    const refContent = useRef<HTMLDivElement>(null);
    const dismiss = useCallback((event: MouseEvent) => {
        if (ref.current!.contains(event.target as Node))
            return
        return setIsShow(() => {
            refContent.current!.style.display = "none";
            return false
        })
    }, []);
    const refInstance = useComponentVisible(dismiss);
    const handleSize = () => {
        const trigger = ref.current;
        if (trigger == null) {
            return;
        }
        const { offsetTop, offsetLeft } = (trigger as HTMLElement);
        // const rect = element.getBoundingClientRect();
        const triggerButton = trigger.getBoundingClientRect();
        const coords = getPopoverCoords(triggerButton, offsetLeft, offsetTop);
        return coords;
    }
    useLayoutEffect(() => {
        function updateSize() {
            const size = handleSize()
            refContent.current!.style.top = size?.top + 'px'
            refContent.current!.style.left = size?.left + 'px'
        }
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    const onClick = (e: MouseEvent) => {
        if (isCreate) {
            refContent.current!.style.display === 'none' ? refContent.current!.style.display = "block" : refContent.current!.style.display = "none"
            return
        }
        const mergeRef = mergeRefs([refContent, refInstance])
        const cloneContent = () => {
            
            const trigger = ref.current;
            if (trigger == null) {
                return;
            }
            const coords = handleSize();
            return (
                <ChakraProvider>
                    <div
                        ref={mergeRef}
                        className="content-popover"
                        style={{ position: 'absolute', left: coords?.left, top: coords?.top }}
                    >
                        {content}
                    </div>
                </ChakraProvider>
            )
        }

        setIsShow(true)
        setIsCreate(true)
        const container = document.body.appendChild(document.createElement('div'));
        const root = createRoot(container);
        root.render(cloneContent());
        // Get the size of the element
    };
    const childrenToTriggerPopover = React.cloneElement(children, {
        onClick, // TODO: we better merge the onClick
        ref, // TODO: we better merge the ref
    });
    const contextValue = {
        isShow,
        setIsShow,
        preferredPosition,
        triggerRect,
        setTriggerRect,
    };

    return (
        <PopoverContext.Provider value={contextValue}>
            {childrenToTriggerPopover}
        </PopoverContext.Provider>
    );
}
function mergeRefs(refs: any) {
    return (value: any) => {
        refs.forEach((ref: any) => {
            if (typeof ref === "function") {
                ref(value);
            } else if (ref != null) {
                ref.current = value;
            }
        });
    };
}
function getPopoverCoords(
    triggerRect: DOMRect,
    offsetLeft: number,
    offsetTop: number,
) {

    // TODO: cover all positions
    let top = offsetTop - triggerRect.width - 10;
    let left =
        offsetLeft - triggerRect.width - triggerRect.width / 2
        ;

    // failover to top if there is not enough space
    return {
        top,
        left,
    };
}
// Use generics to specify the type of initialIsVisible
function useComponentVisible(
    callback: (event: MouseEvent) => void
) {
    // Use generic T for state variable type

    // Use RefObject<RefElement | null> for ref object type
    const refInstance = useRef<RefElement | null>(null);

    const handleClickOutside = (event: MouseEvent) => {
        // Use type assertion for event.target as Node
        if (refInstance.current && !refInstance.current.contains(event.target as Node)) {
            callback(event)
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside, true);
        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    }, []);

    // Return an object with specific types for each value
    return refInstance
}