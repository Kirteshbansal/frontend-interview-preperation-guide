import { useState } from 'react'

// eslint-disable-next-line react/prop-types
function Folder({ name, children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <li>
            <strong onClick={() => setIsOpen(!isOpen)}>
                <span style={{ display: 'inline-block' ,transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>🔺</span>{name}</strong>
            {isOpen &&
                (<ul style={{marginLeft: '20px'}}>
                    {children}
                </ul>)}
        </li>
    )
}

export default Folder;